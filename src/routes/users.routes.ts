import { Router } from 'express';
import multer from 'multer';
import CreatedeUsersService from '../services/CreateUserService';
import verificandoAltenticacao from '../middlewares/verificandoAltenticacao';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
    const { name, email, password } = request.body;

    const createUser = new CreatedeUsersService();

    const user = await createUser.execute({
        name,
        email,
        password,
    });
    delete user.password;

    return response.json(user);
});

usersRouter.patch(
    '/avatar',
    verificandoAltenticacao,
    upload.single('avatar'),
    async (request, response) => {
        const updateUserAvatar = new UpdateUserAvatarService();
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFileName: request.file.filename,
        });
        delete user.password;
        return response.json(user);
    },
);

export default usersRouter;
