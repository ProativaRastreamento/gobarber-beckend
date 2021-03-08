# Recuperaçãode senha

**RF** Recursos funcionais

- O usuário deve poder recuperar sua senha informando seu e-mail;
- O usuário deve poder receber um e-mail com instuções de recuperação de senha;
- O usuário deve poder resetar sua senha;


**RNF** Recursos Não funcionais

- Utilizar Mailtrap para testes de envio em ambiente de dev;
- Ultilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);


**RN** Regra de Negocio

- O link enviado por e-mail deve expirar em 2 horas;
- O usuário deve digitar a senha e confirmar a sua senha em um novo campo;


# Atualização do perfil

**RF**

- O cliente deve poder trocar seu nome, email e senha;

**RNF**

-

**RN**

- O usuário não pode cadastrar um e-mail existente;
- Para atualizar sua senha, o usuário deve informar a sua senha antiga;
- Para atualizar sua senha, o usuário precisa confirmar a nova senha;


# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia especifico;
- O prestador deve receber uma notificação sempre que houver um novo agendamento;
- O prestador deve poder visualizar as notificaçoes não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser armazenadas em cache;
- As notificaçoes do prestador devem ser armazenadas no MongoDB;
- As notificaçoes do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN**

- A notificaçoes deve ter um status de lida é não lida;



# Agendamento de serviços

**RF**

- O usuário deve poder listar todos os cabelereiros listados;
- O usuário deve poder listar os dias com os horarios disponiveis de um prestador;
- O usuário deve poder fazer um agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve ter duração de 1 hora;
- Os agendamentos devem estar disponiveis no horario comercial;
- O usuário não pode agendar em um horário anteriomente agendado;
- O usuário não pode fazer um agendamento em horario no passado;

