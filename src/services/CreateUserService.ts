import { getRepository } from 'typeorm';
import User from '../models/User';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

interface RequestUserCreation {
    name: string;
    email: string;
    password: string;
}

import AppError from '../errors/AppError';

class CreateUserService {
    public async execute({
        name,
        email,
        password,
    }: RequestUserCreation): Promise<User> {
        const usersRepository = getRepository(User);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError('Email adress already used by another user');
        }

        const hashedPassword = await hash(password, 10);
        const verificationCode = `${uuidv4()}${uuidv4()}`;

        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
            verification: verificationCode,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
