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
import * as Sentry from '@sentry/node';
import * as Tracing from '@sentry/tracing';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/favicon.ico', express.static('images/favicon.ico'));
require('dotenv').config();

Sentry.init({
    dsn:
        'https://b1e2a129803249919115f9ff385c1a3c@o1065351.ingest.sentry.io/6057000',
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
});

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
