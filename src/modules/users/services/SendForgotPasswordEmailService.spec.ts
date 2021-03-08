import FakeMailProvider from '@shared/container/providers/MailProvader/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppRrror';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('teste de recuperação de senha via de e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');
    await fakeUsersRepository.create({
      name: 'Alfredo',
      email: 'alfredo_alfabeta@hotmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'alfredo_alfabeta@hotmail.com',
    });
    expect(sendMail).toHaveBeenCalled();
  });

  it('Não permitir que um usuário não cadastado faça recuperação de senha', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'alfredo_alfabeta@hotmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('verificar se o token esta sendo gerado', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'Alfredo',
      email: 'alfredo_alfabeta@hotmail.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'alfredo_alfabeta@hotmail.com',
    });
    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
