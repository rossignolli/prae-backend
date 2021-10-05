/* eslint-disable import/extensions */
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import mailgun from 'mailgun-js';
const usersRouter = Router();
//@ts-ignore
const upload = multer(uploadConfig);

import CreateUserService from '../services/CreateUserService';
import UpdatedUserAvatarService from '../services/CreateUserService';
import ensureAuthnecticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import User from '../models/User';
import { getRepository } from 'typeorm';
import RecoverPasswordService from '../services/RecoverPasswordService';
import AppError from '../errors/AppError';
import { hash } from 'bcryptjs';

interface AWSFiles {
    location: string;
}

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();
        const api_key = process.env.MAILGUNGUN_KEY;
        const DOMAIN = process.env.MAILGUNDOMAIN;

        const user = await createUser.execute({ name, email, password });

        if (api_key && DOMAIN) {
            const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

            const data = {
                from: 'Prae - Confirmação de E-mail <no-reply@mg.vigarani.dev>',
                to: user.email,
                subject: 'Prae -  Email de verificação',
                html: `
                <h1>Email de confirmação - Prae</h1>
                <p>Você está recebendo esse email devido ao cadastro na plataforma prae</p>
                Para confirmar o seu cadastro <a href="${process.env.BASE_URL_FRONT}/accout/confirmation/${user.verification}">Clique aqui</a>
            `,
            };

            mg.messages().send(data, function (error, body) {
                console.log(body);
            });
        }

        return response.json({ sucess: 'Verification email sent' });
    } catch (err) {
        //@ts-ignore
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.post('/resend', async (request, response) => {
    try {
        const { email } = request.body;

        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (!checkUserExists) {
            throw new Error('User does not exist');
        }

        if (checkUserExists.isActive) {
            throw new Error('This user is already activated');
        }

        const api_key = process.env.MAILGUNGUN_KEY;
        const DOMAIN = process.env.MAILGUNDOMAIN;

        if (api_key && DOMAIN) {
            const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

            const data = {
                from: 'Prae - Confirmação de E-mail <no-reply@mg.vigarani.dev>',
                to: checkUserExists.email,
                subject: 'Prae -  Email de verificação',
                html: `
                <h1>Email de confirmação - Prae</h1>
                <p>Você está recebendo esse email devido ao cadastro na plataforma prae</p>
                Para confirmar o seu cadastro <a href="${process.env.BASE_URL_FRONT}/accout/confirmation/${checkUserExists.verification}">Clique aqui</a>
            `,
            };

            mg.messages().send(data, function (error, body) {
                console.log(body);
            });
        }

        return response.json({ sucess: 'Verification email sent' });
    } catch (err) {
        //@ts-ignore
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.post('/recover', async (request, response) => {
    try {
        const { email } = request.body;

        const recoverService = new RecoverPasswordService();
        const api_key = process.env.MAILGUNGUN_KEY;
        const DOMAIN = process.env.MAILGUNDOMAIN;

        const user = await recoverService.execute({ email });

        if (api_key && DOMAIN) {
            const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

            const data = {
                from: 'Prae - <vitorrossignolli@gmail.com>',
                to: user.email,
                subject: 'Prae -  Email de Recuperação de senha',
                html: `
                <h1>Email de recuperação - Prae</h1>
                <p>Email de recuperação de senha, caso não tenha solicitado, por favor desconsidere</p>
                Para redefinir sua senha <a href="${process.env.BASE_URL_FRONT}/recover/${user.verification}">Clique aqui</a>
            `,
            };

            mg.messages().send(data, function (error, body) {
                console.log(body);
            });
        }

        return response.json(200);
    } catch (err) {
        //@ts-ignore
        return response.status(400).json({ error: `${err.message}` });
    }
});

usersRouter.post('/changepassword', async (request, response) => {
    try {
        const { verification, password } = request.body;

        const api_key = process.env.MAILGUNGUN_KEY;
        const DOMAIN = process.env.MAILGUNDOMAIN;

        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { verification },
        });

        if (!checkUserExists) {
            throw new AppError('This user does not exist');
        }

        if (checkUserExists.verification !== verification) {
            throw new AppError('Invalid User verification Code');
        }

        const hashedPassword = await hash(password, 10);

        checkUserExists.password = hashedPassword;
        checkUserExists.verification = '';

        await usersRepository.save(checkUserExists);

        if (api_key && DOMAIN) {
            const mg = mailgun({ apiKey: api_key, domain: DOMAIN });

            const data = {
                from: 'Prae - <vitorrossignolli@gmail.com>',
                to: checkUserExists.email,
                subject: 'Prae -  Senha de acesso alterada',
                html: `
                <h1>Email de aviso de alteração de senha - Prae</h1>
                <p>Sua senha foi alterada com sucesso.</p>
            `,
            };

            mg.messages().send(data, function (error, body) {
                console.log(body);
            });
        }

        return response.json(200);
    } catch (err) {
        //@ts-ignore
        return response.status(400).json({ error: `${err.message}` });
    }
});

usersRouter.get('/', async (request, response) => {
    const userRepository = getRepository(User);
    const users = await userRepository.find();
    return response.json(users);
});

usersRouter.patch(
    '/avatar',
    ensureAuthnecticated,
    upload.single('image'),
    async (request, response) => {
        const { id, name } = request.body;

        const updateUserAvatar = new UpdateUserAvatarService();

        const requestImage = (request.file as unknown) as AWSFiles;

        if (!request.file) {
            const user = await updateUserAvatar.execute({
                user_id: id,
                name: name,
                avatarFilename: null,
            });

            return response.json(user);
        }

        const user = await updateUserAvatar.execute({
            user_id: id,
            name: name,
            avatarFilename: requestImage.location,
        });
        //@ts-ignore
        delete user.password;

        return response.json(user);
    },
);

export default usersRouter;
