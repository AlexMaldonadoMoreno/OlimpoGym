import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'Faltan datos para el registro.' });
        }

        const newUser = await authService.registerUser(name, email, password);

        return res.status(201).json({
            status: 'success',
            message: 'Iniciado registrado con éxito en el Olimpo',
            data: newUser
        });
    } catch (error) {
        return next(error);
    }
};