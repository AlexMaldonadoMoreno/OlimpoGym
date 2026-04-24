import { query } from '../db';
import argon2 from 'argon2';

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