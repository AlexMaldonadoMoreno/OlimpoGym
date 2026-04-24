import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { globalErrorHandler } from './middlewares/errorHandler';

const app: Application = express();

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(morgan('dev'));

// Registro de Rutas
// app.use('/api/auth', authRoutes);

// Manejador de errores global (Debe ir al final)
app.use(globalErrorHandler);

export default app;