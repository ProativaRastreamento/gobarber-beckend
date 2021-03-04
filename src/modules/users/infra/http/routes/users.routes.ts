import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import verificandoAltenticacao from '@modules/users/infra/http/middlewares/verificandoAltenticacao';
import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();

const userAvatarController = new UserAvatarController();
const usersController = new UsersController();
const upload = multer(uploadConfig);

usersRouter.post('/', usersController.create);

usersRouter.patch(
  '/avatar',
  verificandoAltenticacao,
  upload.single('avatar'),
  userAvatarController.update,
);

export default usersRouter;
