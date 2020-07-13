import { getCustomRepository } from 'typeorm';
import { startOfHour } from 'date-fns';
import AppError from '../errors/AppRrror';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface ResquestDTO {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async exucute({
        provider_id,
        date,
    }: ResquestDTO): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );
        const appontmentDate = startOfHour(date);

        const verificarSeTemAgendadmento = await appointmentsRepository.findByDate(
            appontmentDate,
        );

        if (verificarSeTemAgendadmento) {
            throw new AppError('Orario com agendamento');
        }

        const appointment = appointmentsRepository.create({
            provider_id,
            date: appontmentDate,
        });
        // Salvando no banco de dados.

        await appointmentsRepository.save(appointment);
        return appointment;
    }
}

export default CreateAppointmentService;
