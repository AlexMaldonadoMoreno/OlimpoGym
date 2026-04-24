import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para proteger rutas según el rango.
 * @param allowedRoles Lista de roles permitidos, ej: ['consejo', 'entrenador']
 */
export const authorizeRoles = (...allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {

        const user = req.user;

        // Medida de seguridad pasiva: Si este middleware se ejecuta antes que verifyJWT, bloquea.
        if (!user || !user.role) {
            return res.status(500).json({
                status: 'error',
                message: 'Error interno: La identidad del usuario no fue validada previamente.'
            });
        }

        // ¿El rol del usuario está en la lista de invitados VIP?
        if (!allowedRoles.includes(user.role)) {
            return res.status(403).json({
                status: 'error',
                message: `Acceso denegado. Se requiere uno de los siguientes rangos: ${allowedRoles.join(', ')}.`
            });
        }

        return next(); // ¡Tiene el rango adecuado!
    };
};