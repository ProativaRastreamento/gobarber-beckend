import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppRrror';
import IUsersRepository from '../repositories/IUserRepository';
import IHashProviders from '../providers/HasProvider/models/IHashProviders';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  name: string;
  email: string;
  password: string;
}
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProviders: IHashProviders,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const verificaSeEmailExiste = await this.usersRepository.findByEmail(email);

    if (verificaSeEmailExiste) {
      throw new AppError('Esse email já existe!');
    }
    const hashPassword = await this.hashProviders.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPassword,
    });

    return user;
  }
}

export default CreateUserService;
