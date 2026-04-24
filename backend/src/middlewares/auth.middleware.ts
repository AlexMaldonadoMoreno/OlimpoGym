import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    try {
        // 1. Buscamos el token en las cabeceras
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                status: 'error',
                message: 'Acceso denegado. Se requiere el pase del Olimpo (Token).'
            });
        }

        // 2. Extraemos el código
        const token = authHeader.split(' ')[1];

        // 3. Desciframos usando nuestra utilidad (si falla, salta al catch)
        // 4. Inyectamos la identidad del usuario en la petición para el Controlador
        req.user = verifyToken(token);

        return next(); // ¡Puede pasar!

    } catch (error) {
        return res.status(401).json({
            status: 'error',
            message: 'El pase es inválido o ha expirado. Inicia sesión nuevamente.'
        });
    }
};