import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
    PORT: z.coerce.number().default(3000), // coerce convierte el string de .env a número automáticamente
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

    // Base de datos
    DATABASE_URL: z.string().url({ message: "La DATABASE_URL debe ser una URL válida de PostgreSQL." }),

    // Seguridad
    JWT_SECRET: z.string().min(15, { message: "El JWT_SECRET es muy corto. Debe tener al menos 15 caracteres." }),
    JWT_EXPIRES_IN: z.string().default('7d'),

    // CORS
    FRONTEND_URL: z.string().url({ message: "El FRONTEND_URL debe ser una URL válida." }).default('http://localhost:5173'),
});

const _env = envSchema.safeParse(process.env);

// 3. Si algo está mal, apagamos el sistema y mostramos el error exacto
if (!_env.success) {
    console.error('ACCESO DENEGADO: Variables de entorno inválidas o faltantes.');

    console.error(_env.error.format());

    process.exit(1);
}

export const env = _env.data;