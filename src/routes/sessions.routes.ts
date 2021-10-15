/* eslint-disable import/extensions */
import { Router } from 'express';
import { compare } from 'bcryptjs';
import { getRepository } from 'typeorm';

const sessionsRouter = Router();

import AuthenticateUserService from '../services/AuthenticateUserService';
import User from '../models/User';
import AppError from '../errors/AppError';
import Equipament from '../models/Equipament';
import Preventive from '../models/Preventives';
import Brand from '../models/Brand';
import { differenceInDays, isFuture, isPast } from 'date-fns';

sessionsRouter.post('/', async (request, response) => {
    try {
        const { email, password } = request.body;

        const authUser = new AuthenticateUserService();

        const { user, token } = await authUser.execute({ email, password });
        //@ts-ignore
        delete user.password;

        return response.json({ user, token });
    } catch (err) {
        //@ts-ignore
        return response.status(401).json({ error: `${err.message}` });
    }
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

sessionsRouter.get('/home', async (request, response) => {
    const equipamentsRepository = getRepository(Equipament);
    const preventiveRepository = getRepository(Preventive);
    const brandRepository = getRepository(Brand);
    const userRepository = getRepository(User);

    const equipaments = await equipamentsRepository.find({
        order: { dateLastStopMonitor: 'DESC' },
    });

    const preventive = await preventiveRepository.find();
    const brand = await brandRepository.find();
    const user = await userRepository.find();

    const homeData = {
        equipamentsTotal: equipaments.length,
        preventiveTotal: preventive.length,
        brandTotal: brand.length,
        userTotal: user.length,
    };

    return response.json(homeData);
});

export default sessionsRouter;
