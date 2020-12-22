/* eslint-disable import/extensions */
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
const usersRouter = Router();
const upload = multer(uploadConfig);

import CreateUserService from '../services/CreateUserService';
import UpdatedUserAvatarService from '../services/CreateUserService';
import ensureAuthnecticated from '../middlewares/ensureAuthenticated';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password } = request.body;

        const createUser = new CreateUserService();

        const user = await createUser.execute({ name, email, password });

        const responseUser = {
            name: user.name,
            email: user.email,
            id: user.id,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        return response.json(responseUser);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensureAuthnecticated,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService();

        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        delete user.password;

        return response.json(user);
    },
);

export default usersRouter;
