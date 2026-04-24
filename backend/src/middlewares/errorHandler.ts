import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({
        status: 'error',
        message: 'Ocurrió un error en el Santuario del Olimpo.'
    });
};