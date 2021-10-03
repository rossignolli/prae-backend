/* eslint-disable import/extensions */
import { Router } from 'express';
import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';

const sessionsRouter = Router();

import AuthenticateUserService from '../services/AuthenticateUserService';
import User from '../models/User';
import AppError from '../errors/AppError';

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authUser = new AuthenticateUserService();

    const { user, token } = await authUser.execute({ email, password });

    delete user.password;

    return response.json({ user, token });
});

sessionsRouter.get('/confirmation/:code', async (request, response) => {
    const verificationCode = request.params.code;
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
        where: { verification: verificationCode },
    });

    if (!user) {
        throw new AppError('Invalid Verification Code', 401);
    }

    user.isActive = true;

    await usersRepository.save(user);

    return response.json({ ok: true });
});

export default sessionsRouter;
