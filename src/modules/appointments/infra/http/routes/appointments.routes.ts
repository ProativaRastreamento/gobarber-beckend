import { Router } from 'express';
import verificandoAutenticacao from '@modules/users/infra/http/middlewares/verificandoAltenticacao';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.use(verificandoAutenticacao);

appointmentsRouter.post('/', appointmentsController.create);

export default appointmentsRouter;
