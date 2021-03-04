import path from 'path';
import { injectable, inject } from 'tsyringe';
import fs from 'fs';
import User from '@modules/users/infra/typeorm/entities/User';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppRrror';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}
@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    // Procurar por um usuario no banco
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Este usuario não possue Avatar.', 401);
    }
    if (user.avatar) {
      // Buscando pelo arquivo de avatar do usuario
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      // Verificando se arquivo existe
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);
      // Se existir vou apagar.
      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFileName;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
