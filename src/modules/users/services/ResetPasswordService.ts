import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppRrror';
import IUsersRepository from '../repositories/IUserRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProviders from '../providers/HashProvider/models/IHashProviders';

interface IRequest {
  token: string;
  passsword: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProviders')
    private hashProviders: IHashProviders,
  ) {}

  public async execute({ token, passsword }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }
    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }
    user.password = passsword;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
