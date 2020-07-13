import { getRepository } from 'typeorm';

import { hash } from 'bcryptjs';

import User from '../models/User';

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const verificaSeEmailExiste = await usersRepository.findOne({
            where: { email },
        });

        if (verificaSeEmailExiste) {
            throw new Error('Esse email já existe!');
        }

        const hashPassword = await hash(password, 10);
        const user = usersRepository.create({
            name,
            email,
            password: hashPassword,
        });
        await usersRepository.save(user);
        return user;
    }
}

export default CreateUserService;
