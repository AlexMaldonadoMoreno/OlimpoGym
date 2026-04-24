import { Request, Response, NextFunction } from 'express';
import leoProfanity from 'leo-profanity';

// Configuramos el diccionario (por defecto usa inglés, puedes agregar listas en español)
leoProfanity.loadDictionary('es'); // Carga palabras en español si están disponibles en la librería
// leoProfanity.add(['palabra_mala_1', 'palabra_mala_2']); // Puedes añadir tu propia lista negra

/**
 * Revisa campos específicos del body para bloquear groserías.
 * @param fields Arreglo de campos a revisar, ej: ['content', 'title']
 */
export const checkProfanity = (fields: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;

        for (const field of fields) {
            // Si el campo existe en el body y es un texto
            if (body[field] && typeof body[field] === 'string') {
                if (leoProfanity.check(body[field])) {
                    return res.status(400).json({
                        status: 'error',
                        message: `El lenguaje utilizado en el campo '${field}' no es digno del Olimpo. Por favor, modéralo.`,
                    });
                }
            }
        }

        return next(); // Lenguaje limpio, puede continuar.
    };
};