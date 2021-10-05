import { getRepository } from 'typeorm';
import User from '../models/User';
import path from 'path';
import fs from 'fs';
import aws from 'aws-sdk';

import uploadConfig from '../config/upload';

import { hash } from 'bcryptjs';

interface RequestUserCreation {
    user_id: string;
    name: string;
    avatarFilename: string | null;
}

import AppError from '../errors/AppError';

class UpdateUserAvatarService {
    public async execute({
        user_id,
        name,
        avatarFilename,
    }: RequestUserCreation): Promise<User> {
        const usersRepository = getRepository(User);

        console.log(user_id, name, avatarFilename);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new AppError(
                'Only authneticated users can change avatar.',
                401,
            );
        }

        const fileToDlete = user.avatar
            ? user.avatar.split('/').pop()
            : 'noAvatar';

        if (avatarFilename !== null && fileToDlete) {
            const s3 = new aws.S3();
            const params = {
                Bucket: 'static-prae',
                Key: fileToDlete,
            };

            try {
                await s3.headObject(params).promise();
                console.log('old avatar found.');
                try {
                    await s3.deleteObject(params).promise();
                    console.log('Deleting Old Avatar ');
                } catch (err) {
                    console.log('ERROR in file : ' + JSON.stringify(err));
                }
            } catch (err) {
                console.log('File not Found');
            }

            user.avatar = avatarFilename;
        }

        user.name = name;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
