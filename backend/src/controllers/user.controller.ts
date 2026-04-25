import { Request, Response, NextFunction } from 'express';
import * as userService from '../services/user.service';

/**
 * Obtener perfil del usuario actual (basado en el token)
 */
export const getMyProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id; // Autenticado por verifyJWT

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'No autenticado.' });
        }

        const user = await userService.getUserById(userId);

        if (!user) {
            return res.status(404).json({ status: 'error', message: 'Usuario no encontrado en los registros.' });
        }

        return res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Actualizar datos del usuario actual
 */
export const updateMyProfile = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ status: 'error', message: 'No autenticado.' });
        }

        // 🛡️ EL EMBUDO DE SEGURIDAD:
        // Extraemos explícitamente SOLO lo que el usuario tiene permitido cambiar
        // (Nota: Asegúrate de agregar profile_picture_url a tu base de datos)
        const { name, profile_picture_url } = req.body;

        const safeUpdateData = {
            ...(name && { name }),
            ...(profile_picture_url && { profile_picture_url })
        };

        // Si no mandó nada válido para actualizar
        if (Object.keys(safeUpdateData).length === 0) {
            return res.status(400).json({
                status: 'error',
                message: 'No se proporcionaron datos válidos para actualizar.'
            });
        }

        const updatedUser = await userService.updateUser(userId, safeUpdateData);

        return res.status(200).json({
            status: 'success',
            message: 'Tu perfil en el Olimpo ha sido actualizado.',
            data: updatedUser
        });
    } catch (error) {
        return next(error);
    }
};

/**
 * Solo Staff (Admin): Listar todos los usuarios
 */
export const getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await userService.getAllUsers();

        return res.status(200).json({
            status: 'success',
            data: users
        });
    } catch (error) {
        return next(error);
    }
};