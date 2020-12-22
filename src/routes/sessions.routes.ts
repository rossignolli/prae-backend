/* eslint-disable import/extensions */
import { Router } from 'express';

const sessionsRouter = Router();

import AuthenticateUserService from '../services/AuthenticateUserService';

sessionsRouter.post('/', async (request, response) => {
    const { email, password } = request.body;

    const authUser = new AuthenticateUserService();

    const { user, token } = await authUser.execute({ email, password });

    delete user.password;

    return response.json({ user, token });
});

export default sessionsRouter;
