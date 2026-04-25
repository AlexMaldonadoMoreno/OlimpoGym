import { query } from '../db';
import argon2 from 'argon2';
import crypto from 'crypto'; // Librería nativa de Node.js para criptografía rápida
import { generateToken } from '../utils/jwt';

export const registerUser = async (name: string, email: string, passwordPlain: string) => {
    const passwordHash = await argon2.hash(passwordPlain);

    const sql = `
        INSERT INTO users (name, email, password_hash, role)
        VALUES ($1, $2, $3, 'iniciado')
        RETURNING id, name, email, role, created_at;
    `;

    const result = await query(sql, [name, email, passwordHash]);

    return result.rows[0];
};

export const loginUser = async (email: string, passwordPlain: string, ipAddress: string, userAgent?: string) => {
    // 1. Buscar al usuario
    const userResult = await query(
        `SELECT id, name, email, password_hash, role, status 
         FROM users 
         WHERE email = $1 AND deleted_at IS NULL`,
        [email]
    );

    const user = userResult.rows[0];

    if (!user) {
        throw { status: 401, message: 'Credenciales inválidas.' };
    }

    if (user.status === 'suspendido') {
        throw { status: 403, message: 'Tu acceso al Olimpo ha sido suspendido por el Consejo.' };
    }

    if (user.status === 'pendiente_medico') {
        throw { status: 403, message: 'No puedes acceder hasta que un Fisioterapeuta valide tu estado.' };
    }

    // 3. Verificar contraseña
    const isPasswordValid = await argon2.verify(user.password_hash, passwordPlain);

    if (!isPasswordValid) {
        throw { status: 401, message: 'Credenciales inválidas.' };
    }

    const token = generateToken({ id: user.id, role: user.role });

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const safeUserAgent = userAgent ? userAgent.substring(0, 255) : 'Desconocido';

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await query(
        `INSERT INTO user_sessions (user_id, token_hash, ip_address, user_agent, expires_at)
         VALUES ($1, $2, $3, $4, $5)`,
        [user.id, hashedToken, ipAddress, safeUserAgent, expiresAt]
    );

    const { password_hash, ...safeUser } = user;

    return { user: safeUser, token };
};

export const revokeToken = async (token: string) => {

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    await query(
        `UPDATE user_sessions 
         SET revoked_at = NOW() 
         WHERE token_hash = $1 AND revoked_at IS NULL`,
        [hashedToken]
    );
};