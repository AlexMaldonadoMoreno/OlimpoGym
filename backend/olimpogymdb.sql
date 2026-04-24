-- ==========================================
-- CONFIGURACIÓN DE SEGURIDAD BASE
-- ==========================================

-- Extensiones requeridas
CREATE EXTENSION IF NOT EXISTS "pgcrypto";     -- gen_random_uuid(), crypt()
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements"; -- monitoreo de queries lentas

-- Revocar privilegios públicos por defecto
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT USAGE ON SCHEMA public TO app_user;      -- solo el rol de la app accede

-- ==========================================
-- 1. TIPOS DE DATOS (ENUMS)
-- ==========================================

CREATE TYPE user_role     AS ENUM ('iniciado', 'entrenador', 'consejo');
CREATE TYPE user_status   AS ENUM ('activo', 'advertido', 'suspendido', 'pendiente_medico');
CREATE TYPE payment_status AS ENUM ('pendiente_verificacion', 'aprobado', 'rechazado');
CREATE TYPE feedback_type     AS ENUM ('sugerencia', 'queja');
CREATE TYPE feedback_priority AS ENUM ('baja', 'normal', 'urgente');
CREATE TYPE feedback_status   AS ENUM ('nuevo', 'en_revision', 'resuelto');
CREATE TYPE reservation_status AS ENUM ('reservado', 'asistio', 'ausente_penalizado');

-- ==========================================
-- 2. TABLA DE AUDITORÍA CENTRAL
-- ==========================================
-- Registra cualquier cambio sensible en el sistema

CREATE TABLE audit_log (
                           id          BIGSERIAL PRIMARY KEY,
                           table_name  VARCHAR(50)  NOT NULL,
                           record_id   TEXT         NOT NULL,  -- UUID o ID del registro afectado
                           action      VARCHAR(10)  NOT NULL CHECK (action IN ('INSERT','UPDATE','DELETE')),
                           changed_by  UUID,                   -- NULL si fue el sistema
                           old_data    JSONB,
                           new_data    JSONB,
                           ip_address  INET,
                           occurred_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Índices de auditoría para consultas forenses
CREATE INDEX idx_audit_table_record  ON audit_log (table_name, record_id);
CREATE INDEX idx_audit_occurred_at   ON audit_log (occurred_at DESC);
CREATE INDEX idx_audit_changed_by    ON audit_log (changed_by);

-- ==========================================
-- 3. TABLAS PRINCIPALES
-- ==========================================

-- ------------------------------------------
-- MÓDULO: Identidad y Disciplina
-- ------------------------------------------
CREATE TABLE users (
                       id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    -- Validación estricta de nombre y email
                       name          VARCHAR(100) NOT NULL
                           CHECK (length(trim(name)) >= 2),
                       email         VARCHAR(254) UNIQUE NOT NULL  -- RFC 5321: máx 254 chars
                           CHECK (email ~* '^[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$'),

    -- Hash largo para Argon2id o bcrypt con cost alto
                       password_hash VARCHAR(512) NOT NULL,

                       role          user_role    DEFAULT 'iniciado',

    -- Sistema de Disciplina con límites lógicos
                       strikes_count SMALLINT     DEFAULT 0 CHECK (strikes_count >= 0 AND strikes_count <= 10),
                       status        user_status  DEFAULT 'activo',
                       last_strike_date TIMESTAMP WITH TIME ZONE,

    -- Bloqueo por intentos fallidos (manejado en app + BD)
                       failed_login_attempts SMALLINT DEFAULT 0 CHECK (failed_login_attempts >= 0),
                       locked_until          TIMESTAMP WITH TIME ZONE,

    -- Soft delete: nunca borrar un usuario real
                       deleted_at    TIMESTAMP WITH TIME ZONE,

                       created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                       updated_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
) WITH (fillfactor = 80);  -- UPDATEs frecuentes (status, strikes) → espacio para HOT updates

-- Índices de users
CREATE INDEX idx_users_email       ON users (email) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_status_role ON users (status, role) WHERE deleted_at IS NULL;
CREATE INDEX idx_users_deleted_at  ON users (deleted_at) WHERE deleted_at IS NOT NULL;

-- ------------------------------------------
-- MÓDULO: Sesiones (para invalidación segura)
-- ------------------------------------------
CREATE TABLE user_sessions (
                               id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                               user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                               token_hash    VARCHAR(512) NOT NULL UNIQUE,  -- hash del JWT/token, nunca el token crudo
                               ip_address    INET,
                               user_agent    TEXT,
                               expires_at    TIMESTAMP WITH TIME ZONE NOT NULL,
                               revoked_at    TIMESTAMP WITH TIME ZONE,      -- para logout e invalidación forzada
                               created_at    TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_user_id   ON user_sessions (user_id) WHERE revoked_at IS NULL;
CREATE INDEX idx_sessions_expires   ON user_sessions (expires_at) WHERE revoked_at IS NULL;

-- ------------------------------------------
-- MÓDULO: El Pacto (Suscripciones y Pagos)
-- ------------------------------------------
CREATE TABLE memberships (
                             id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),  -- UUID: no enumerable
                             name         VARCHAR(50) NOT NULL UNIQUE
                                 CHECK (length(trim(name)) >= 2),
                             price        NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
                             duration_days SMALLINT NOT NULL CHECK (duration_days > 0 AND duration_days <= 3650),
                             is_active    BOOLEAN DEFAULT true,
                             created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_memberships_active ON memberships (is_active) WHERE is_active = true;

CREATE TABLE user_subscriptions (
                                    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                                    user_id       UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                                    membership_id UUID NOT NULL REFERENCES memberships(id),

    -- URL validada con dominio conocido (tu storage, no URLs arbitrarias)
                                    payment_proof_url VARCHAR(512)
                                        CHECK (payment_proof_url IS NULL OR
                                               payment_proof_url ~* '^https://[a-z0-9\-]+\.tudominio\.com/'),
                                    payment_status    payment_status DEFAULT 'pendiente_verificacion',
                                    verified_by       UUID REFERENCES users(id),        -- admin que aprobó
                                    verified_at       TIMESTAMP WITH TIME ZONE,         -- cuándo se aprobó

                                    start_date  TIMESTAMP WITH TIME ZONE,
                                    end_date    TIMESTAMP WITH TIME ZONE,

    -- Integridad lógica de fechas
                                    CONSTRAINT chk_subscription_dates
                                        CHECK (end_date IS NULL OR start_date IS NULL OR end_date > start_date),

    -- Una suscripción no puede ser aprobada sin quien la aprobó
                                    CONSTRAINT chk_verification_consistency
                                        CHECK (
                                            (payment_status = 'aprobado' AND verified_by IS NOT NULL AND verified_at IS NOT NULL)
                                                OR payment_status != 'aprobado'
                                            ),

                                    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
) WITH (fillfactor = 85);

CREATE INDEX idx_subs_user_id        ON user_subscriptions (user_id);
CREATE INDEX idx_subs_status         ON user_subscriptions (payment_status) WHERE payment_status = 'pendiente_verificacion';
CREATE INDEX idx_subs_active_dates   ON user_subscriptions (user_id, end_date DESC) WHERE payment_status = 'aprobado';

-- ------------------------------------------
-- MÓDULO: El Consejo (Sugerencias y Quejas)
-- ------------------------------------------
CREATE TABLE feedback (
                          id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                          user_id    UUID REFERENCES users(id) ON DELETE SET NULL,

                          type       feedback_type NOT NULL,
                          category   VARCHAR(100)  NOT NULL CHECK (length(trim(category)) >= 2),

                          rating     SMALLINT CHECK (rating IS NULL OR (rating >= 1 AND rating <= 5)),
                          priority   feedback_priority,

    -- Límite en content para evitar abusos de almacenamiento
                          content    TEXT NOT NULL CHECK (length(content) >= 10 AND length(content) <= 5000),

    -- URL restringida a tu propio dominio de storage
                          evidence_url VARCHAR(512)
                              CHECK (evidence_url IS NULL OR
                                     evidence_url ~* '^https://[a-z0-9\-]+\.tudominio\.com/'),

                          status       feedback_status DEFAULT 'nuevo',
                          is_flagged   BOOLEAN DEFAULT false,
                          admin_notes  TEXT CHECK (admin_notes IS NULL OR length(admin_notes) <= 2000),

    -- Coherencia: quejas tienen prioridad, sugerencias tienen rating
                          CONSTRAINT chk_feedback_type_fields CHECK (
                              (type = 'queja'      AND priority IS NOT NULL) OR
                              (type = 'sugerencia' AND rating   IS NOT NULL) OR
                              (type IS NULL)
                              ),

                          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
) WITH (fillfactor = 90);

CREATE INDEX idx_feedback_status    ON feedback (status) WHERE status != 'resuelto';
CREATE INDEX idx_feedback_flagged   ON feedback (is_flagged) WHERE is_flagged = true;
CREATE INDEX idx_feedback_user_id   ON feedback (user_id);
CREATE INDEX idx_feedback_created   ON feedback (created_at DESC);

-- ------------------------------------------
-- MÓDULO: El Santuario (Clases y Reservas)
-- ------------------------------------------
CREATE TABLE classes (
                         id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                         name       VARCHAR(100) NOT NULL CHECK (length(trim(name)) >= 2),
                         coach_id   UUID REFERENCES users(id) ON DELETE SET NULL,
                         capacity   SMALLINT NOT NULL CHECK (capacity > 0 AND capacity <= 500),
                         start_time TIMESTAMP WITH TIME ZONE NOT NULL,
                         end_time   TIMESTAMP WITH TIME ZONE NOT NULL,

    -- La clase no puede terminar antes de empezar
                         CONSTRAINT chk_class_times CHECK (end_time > start_time),

    -- Clases de máx 8 horas (evita datos erróneos)
                         CONSTRAINT chk_class_duration CHECK (
                             EXTRACT(EPOCH FROM (end_time - start_time)) <= 28800
                             ),

                         is_cancelled BOOLEAN DEFAULT false,  -- soft cancel
                         created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_classes_start_time  ON classes (start_time) WHERE is_cancelled = false;
CREATE INDEX idx_classes_coach_id    ON classes (coach_id);

CREATE INDEX idx_classes_upcoming
    ON classes (start_time ASC)
    WHERE is_cancelled = false;

CREATE TABLE reservations (
                              id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                              user_id      UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                              class_id     UUID NOT NULL REFERENCES classes(id) ON DELETE CASCADE,

                              status       reservation_status DEFAULT 'reservado',
                              check_in_time TIMESTAMP WITH TIME ZONE,

    -- El check-in solo puede existir si asistió
                              CONSTRAINT chk_checkin_status CHECK (
                                  (status = 'asistio' AND check_in_time IS NOT NULL) OR
                                  (status != 'asistio')
                                  ),

                              created_at   TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

                              CONSTRAINT unique_user_class UNIQUE (user_id, class_id)
) WITH (fillfactor = 85);

CREATE INDEX idx_reservations_class_id  ON reservations (class_id);
CREATE INDEX idx_reservations_user_id   ON reservations (user_id);
CREATE INDEX idx_reservations_status    ON reservations (class_id, status);

-- ==========================================
-- 4. TRIGGERS DE AUDITORÍA Y UPDATED_AT
-- ==========================================

-- Función genérica para updated_at
CREATE OR REPLACE FUNCTION fn_set_updated_at()
    RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
RETURN NEW;
END;
$$;

CREATE TRIGGER trg_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- Función de auditoría para tablas sensibles
CREATE OR REPLACE FUNCTION fn_audit_log()
    RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
INSERT INTO audit_log (table_name, record_id, action, old_data, new_data)
VALUES (
           TG_TABLE_NAME,
           COALESCE(NEW.id::TEXT, OLD.id::TEXT),
           TG_OP,
           CASE WHEN TG_OP != 'INSERT' THEN to_jsonb(OLD) ELSE NULL END,
           CASE WHEN TG_OP != 'DELETE' THEN to_jsonb(NEW) ELSE NULL END
       );
RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER trg_subs_updated_at BEFORE UPDATE ON user_subscriptions FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_feedback_updated_at BEFORE UPDATE ON feedback FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();
CREATE TRIGGER trg_reservations_updated_at BEFORE UPDATE ON reservations FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

-- ==========================================
-- 5. ROW LEVEL SECURITY (RLS)
-- ==========================================

ALTER TABLE users             ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback          ENABLE ROW LEVEL SECURITY;
ALTER TABLE reservations      ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes           ENABLE ROW LEVEL SECURITY;

-- Ejemplo de políticas RLS (ajustar según tu framework de auth)
-- Los usuarios solo ven su propia data; el consejo ve todo

CREATE POLICY pol_users_self ON users
    USING (id = current_setting('app.current_user_id', true)::UUID
    OR current_setting('app.current_role', true) = 'consejo');

CREATE POLICY pol_subs_self ON user_subscriptions
    USING (user_id = current_setting('app.current_user_id', true)::UUID
    OR current_setting('app.current_role', true) IN ('consejo', 'entrenador'));

CREATE POLICY pol_feedback_self ON feedback
    USING (user_id = current_setting('app.current_user_id', true)::UUID
    OR current_setting('app.current_role', true) = 'consejo');

CREATE POLICY pol_reservations_self ON reservations
    USING (user_id = current_setting('app.current_user_id', true)::UUID
    OR current_setting('app.current_role', true) IN ('consejo', 'entrenador'));

-- ==========================================
-- 6. LIMPIEZA AUTOMÁTICA
-- ==========================================

-- Función para limpiar sesiones expiradas (ejecutar con pg_cron o cron externo)
CREATE OR REPLACE FUNCTION fn_cleanup_expired_sessions()
    RETURNS void LANGUAGE sql AS $$
DELETE FROM user_sessions
WHERE expires_at < CURRENT_TIMESTAMP - INTERVAL '7 days';
$$;