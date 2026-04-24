import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { env } from '../configs/env';

// Intercepta CUALQUIER error enviado por la función next(error)
export const globalErrorHandler = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    // 1. Log del error en consola (Solo en desarrollo para no saturar los logs en producción)
    if (env.NODE_ENV === 'development') {
        console.error('💥 [Error Log]:', err);
    }

    // 2. Manejo de Errores de Validación (Zod)
    if (err instanceof ZodError) {
        return res.status(400).json({
            status: 'error',
            message: 'Datos de entrada inválidos',
            // Mapeamos los errores de Zod para que el Frontend sepa exactamente qué campo falló
            errors: err.issues.map(issue => ({
                field: issue.path.join('.'),
                message: issue.message
            }))
        });
    }

    if (err.code === '23505') {
        return res.status(409).json({
            status: 'error',
            message: 'Este registro ya existe en el Olimpo. Intenta con otro.',
            // Postgres suele poner el detalle en err.detail
            detail: env.NODE_ENV === 'development' ? err.detail : undefined
        });
    }

    // 4. Fallback (Errores genéricos o no controlados)
    const statusCode = err.status || 500;
    const message = statusCode === 500 && env.NODE_ENV === 'production'
        ? 'Ocurrió un error inesperado en el Santuario.'
        : err.message || 'Error Interno del Servidor';

    return res.status(statusCode).json({
        status: 'error',
        message,
        // Solo enviamos el stack trace si estamos desarrollando
        stack: env.NODE_ENV === 'development' ? err.stack : undefined
    });
};