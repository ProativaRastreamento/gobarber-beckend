import AppError from '@shared/errors/AppRrror';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HasProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('shud be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'alfredo rodrigues',
      email: 'alfredo_alfabeta@hotmail.com',
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });

  it('Não permitir a criação de um usuario como o mesmo e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'alfredo rodrigues',
      email: 'alfredo_alfabeta@hotmail.com',
      password: '123456',
    });
    expect(
      createUser.execute({
        name: 'alfredo rodrigues',
        email: 'alfredo_alfabeta@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
