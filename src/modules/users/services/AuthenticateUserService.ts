import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppRrror';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUserRepository';
import UsersRepository from '../infra/typeorm/repositories/UsersRepository';
import IHashProviders from '../providers/HashProvider/models/IHashProviders';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}
@injectable()
class sessionsUserService {
  constructor(
    @inject(UsersRepository)
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProviders: IHashProviders,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    if (!user) {
      throw new AppError('E-mail ou senha incoreto', 401);
    }

    const passwordMatched = await this.hashProviders.compareHash(
      password,
      user.password,
    );
    if (!passwordMatched) {
      throw new AppError('E-mail ou senha incoreto', 401);
    }
    // Gerando o token do usuario
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
export default sessionsUserService;
