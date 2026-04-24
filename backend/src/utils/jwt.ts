import jwt from 'jsonwebtoken';
import { env } from '../configs/env';

export interface TokenPayload {
    id: string;
    role: string;
}

export const generateToken = (payload: TokenPayload): string => {
    return jwt.sign(payload, env.JWT_SECRET, {
        expiresIn: env.JWT_EXPIRES_IN as any,
    });
};

export const verifyToken = (token: string): TokenPayload => {
    // Si el token es falso o expiró, esto lanzará un error automáticamente
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
};