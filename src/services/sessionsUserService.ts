import { getRepository } from 'typeorm';

import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';
import AppError from '../errors/AppRrror';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}
class sessionsUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });
        if (!user) {
            throw new AppError('E-mail ou Password incoreto', 401);
        }

        const passwordMatched = await compare(password, user.password);
        if (!passwordMatched) {
            throw new AppError('E-mail ou Password incoreto', 401);
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
