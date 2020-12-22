import { Response, Request, NextFunction } from 'express';
import authConfig from '../config/auth';

interface TokenPayLoad {
    iat: number;
    exp: number;
    sub: string;
}

import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';

export default function ensureAuthneticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);

        const { sub } = decoded as TokenPayLoad;

        request.user = {
            id: sub,
        };

        return next();
    } catch {
        throw new AppError('Invalid JWT Token', 401);
    }
}
