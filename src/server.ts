import dotenv from 'dotenv';
import 'reflect-metadata';
import express, { json, Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import './database';
import AppError from './errors/AppError';
import Mail from './services/Mail';
import { createConnection } from 'typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/favicon.ico', express.static('images/favicon.ico'));
require('dotenv').config();

createConnection()
    .then(() => {
        app.use(routes);
        dotenv.config();
        app.use(
            (
                err: Error,
                request: Request,
                response: Response,
                _next: NextFunction,
            ) => {
                if (err instanceof AppError) {
                    return response.status(err.statusCode).json({
                        status: 'error',
                        message: err.message,
                    });
                }

                console.log(err);

                return response.status(500).json({
                    status: 'error',
                    message: 'Internal server error',
                });
            },
        );

        // const createMonitorService = new Mail();

        // createMonitorService.execute();

        app.listen(process.env.PORT || 3333, () => {
            console.log('Server started on port 3333!🚀');
        });
    })
    .catch(error => {
        console.log(error);
    });
