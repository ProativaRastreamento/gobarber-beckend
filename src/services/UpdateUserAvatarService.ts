import path from 'path';
import { getRepository } from 'typeorm';
import fs from 'fs';
import User from '../models/User';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppRrror';

interface Request {
    user_id: string;
    avatarFileName: string;
}
class UpdateUserAvatarService {
    public async execute({ user_id, avatarFileName }: Request): Promise<User> {
        const userRepository = getRepository(User);
        // Procurar por um usuario no banco
        const user = await userRepository.findOne(user_id);
        if (!user) {
            throw new AppError('Este usuario não possue Avatar.', 401);
        }
        if (user.avatar) {
            // Buscando pelo arquivo de avatar do usuario
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );
            // Verificando se arquivo existe
            const userAvatarFileExist = await fs.promises.stat(
                userAvatarFilePath,
            );
            // Se existir vou apagar.
            if (userAvatarFileExist) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }
        user.avatar = avatarFileName;
        await userRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
