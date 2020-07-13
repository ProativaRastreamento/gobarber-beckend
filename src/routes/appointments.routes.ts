import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppontmentService';
import VerificandoAutenticacao from '../middlewares/verificandoAtenticacao';

const appointmentsRouter = Router();

//appointmentsRouter.use(VerificandoAutenticacao);

// Listando todos os agendamentos.
appointmentsRouter.get('/', async (request, response) => {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date } = request.body;

    const parseDate = parseISO(date);
    const CreateAppoint = new CreateAppointmentService();

    const appointment = await CreateAppoint.exucute({
        date: parseDate,
        provider_id,
    });
    return response.json(appointment);
});

export default appointmentsRouter;
