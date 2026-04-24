import app from './app';
import { pool } from './db';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
    console.log(`OlimpoGym Backend corriendo en http://localhost:${PORT}`);
});

// Graceful Shutdown (Apagado elegante)
const shutdown = async () => {
    console.log('\n Cerrando el Olimpo...');
    await pool.end(); // Cerramos conexiones a la DB
    server.close(() => {
        console.log('⚡ Servidor apagado.');
        process.exit(0);
    });
};

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);