import { getRepository } from 'typeorm';
import User from '../models/User';
import path from 'path';
import fs from 'fs';

import uploadConfig from '../config/upload';

import { hash } from 'bcryptjs';

interface RequestUserCreation {
    user_id: string;
    avatarFilename: string;
}

import AppError from '../errors/AppError';

class UpdateUserAvatarService {
    public async execute({
        user_id,
        avatarFilename,
    }: RequestUserCreation): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new AppError(
                'Only authneticated users can change avatar.',
                401,
            );
        }

        if (user.avatar) {
            const userAvatarFilepath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            const userAvatarFilesExistirs = await fs.promises.stat(
                userAvatarFilepath,
            );

            if (userAvatarFilesExistirs) {
                await fs.promises.unlink(userAvatarFilepath);
            }
        }

        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
