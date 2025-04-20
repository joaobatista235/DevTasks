import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import userRoutes from './routes/userRoutes';

import './config/firebase';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());          // Libera acesso externo à API (fontes desconhecidas)
app.use(helmet());        // Adiciona proteção de segurança (headers)
app.use(morgan('dev'));   // Loga cada requisição feita
app.use(express.json());  // Permite ler JSON no body da requisição
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Máximo de 100 requisições por IP no tempo de windowMs - 15 minutos

app.use('/api', userRoutes);

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});