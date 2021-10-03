import { getRepository } from 'typeorm';
import User from '../models/User';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

interface RecoverUser {
    email: string;
}

import AppError from '../errors/AppError';

class RecoverPasswordService {
    public async execute({ email }: RecoverUser): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (!checkUserExists) {
            throw new AppError('This email is not registered');
        }

        if (!checkUserExists.isActive) {
            throw new AppError('This Account is not activated');
        }

        const verificationCode = `${uuidv4()}${uuidv4()}`;

        checkUserExists.verification = verificationCode;

        await usersRepository.save(checkUserExists);

        return checkUserExists;
    }
}

export default RecoverPasswordService;
