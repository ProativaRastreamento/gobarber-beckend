import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppRrror';

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use('/files', express.static(uploadConfig.directory));

app.use(
    (err: Error, request: Request, response: Response, _nex: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: 'Internal server error',
        });
    },
);

app.listen(3333, () => {
    // eslint-disable-next-line no-console
    console.log('🚀 Servidor Iniciado porta 3333!');
});
