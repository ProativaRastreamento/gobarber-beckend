import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppRrror';

import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IResquest {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('appointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async exucute({ date, provider_id }: IResquest): Promise<Appointment> {
    const appontmentDate = startOfHour(date);

    const verificarSeTemAgendadmento = await this.appointmentsRepository.findByDate(
      appontmentDate,
    );

    if (verificarSeTemAgendadmento) {
      throw new AppError('Orario com agendamento');
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appontmentDate,
    });
    // Salvando no banco de dados.
    return appointment;
  }
}

export default CreateAppointmentService;
