import { startOfHour, parseISO } from 'date-fns';
import Preventive from '../models/Preventives';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { getCustomRepository, getRepository } from 'typeorm';

interface RequestDTO {
    equipament_id: string;
    technician_id: string;
    jobs: string;
    isCorrective: boolean;
}

import AppError from '../errors/AppError';

// SOLID

// Single Responsability Principle
// Dependecy Invertion Principle

class CreateAppointmentService {
    public async execute({
        equipament_id,
        technician_id,
        jobs,
        isCorrective,
    }: RequestDTO): Promise<Preventive> {
        const preventiveRepository = getRepository(Preventive);

        const preventive = preventiveRepository.create({
            equipament_id,
            technician_id,
            jobs,
            isCorrective,
        });

        await preventiveRepository.save(preventive);

        return preventive;
    }
}

export default CreateAppointmentService;

// const preventiveRepository = getCustomRepository(
//     AppointmentsRepository,
// );

// const appointmentDate = startOfHour(date);

// const findAppointmentInSameDate = await preventiveRepository.finyByDate(
//     appointmentDate,
// );

// if (findAppointmentInSameDate) {
//     throw new AppError('This appointment is alredy booked');
// }
