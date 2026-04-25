import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Faltan datos requeridos (name, email, password).'
            });
        }

        const newUser = await authService.registerUser(name, email, password);

        return res.status(201).json({
            status: 'success',
            message: 'Iniciado registrado con éxito en el Olimpo.',
            data: newUser
        });
    } catch (error) {
        return next(error);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Debes proporcionar email y contraseña para entrar al Olimpo.'
            });
        }

        // Se asume que el authService.login evalúa contraseñas y genera el JWT
        const { token, user } = await authService.loginUser(email, password, req.ip || '0.0.0.0', req.headers['user-agent']);

        return res.status(200).json({
            status: 'success',
            message: 'Bienvenido nuevamente al Santuario.',
            data: { user, token }
        });
    } catch (error) {
        return next(error);
    }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // En un esquema con DB de sesiones, se revoca el session_token o JWT
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        if (token) {
            await authService.revokeToken(token);
        }

        return res.status(200).json({
            status: 'success',
            message: 'Has salido del Santuario. Tu sesión ha sido cerrada.'
        });
    } catch (error) {
        return next(error);
    }
};
