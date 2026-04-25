import { query } from '../db';

// 1. Tipamos exactamente qué se puede actualizar
export interface UpdateUserDTO {
    name?: string;
    profile_picture_url?: string;
}

/**
 * Obtener un usuario por su ID
 */
export const getUserById = async (id: string) => {
    const sql = `
        SELECT id, name, email, role, status, profile_picture_url, strikes_count, created_at, updated_at
        FROM users
        WHERE id = $1 AND deleted_at IS NULL
    `;

    const result = await query(sql, [id]);
    return result.rows[0];
};

/**
 * Actualizar campos seguros del perfil del usuario
 */
export const updateUser = async (id: string, updateData: UpdateUserDTO) => {
    const { name, profile_picture_url } = updateData;

    const updates: string[] = [];
    const values: any[] = [];
    let counter = 1;

    // 2. Limpiamos los espacios en blanco para no hacer enojar al CHECK de Postgres
    if (name !== undefined) {
        updates.push(`name = $${counter++}`);
        values.push(name.trim());
    }

    if (profile_picture_url !== undefined) {
        updates.push(`profile_picture_url = $${counter++}`);
        values.push(profile_picture_url.trim());
    }

    if (updates.length === 0) {
        return getUserById(id);
    }

    updates.push(`updated_at = NOW()`);

    // El último valor siempre será el ID para el WHERE
    values.push(id);
    // Y el ID toma la posición del counter actual
    const sql = `
        UPDATE users 
        SET ${updates.join(', ')}
        WHERE id = $${counter} AND deleted_at IS NULL
        RETURNING id, name, email, role, status, profile_picture_url, updated_at
    `;

    const result = await query(sql, values);
    return result.rows[0];
};

/**
 * Obtener la lista completa de todos los miembros/usuarios activos
 */
export const getAllUsers = async () => {
    // 3. Agregué profile_picture_url aquí, seguro lo necesitarás en el frontend
    // para mostrar la lista de usuarios con sus fotos en el panel de administración
    const sql = `
        SELECT id, name, email, role, status, profile_picture_url, strikes_count, created_at
        FROM users
        WHERE deleted_at IS NULL
        ORDER BY created_at DESC
    `;

    const result = await query(sql);
    return result.rows;
};