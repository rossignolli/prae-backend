/* eslint-disable prettier/prettier */
import Appointment from '../models/Appointment';

import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    public async finyByDate(date: Date): Promise<Appointment | null> {
        const findAppointment = await this.findOne({
            where: { date: date },
        });

        return findAppointment || null;
    }
}

export default AppointmentsRepository;
