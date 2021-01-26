import { getRepository } from 'typeorm';
import Equipament from '../models/Equipament';
import { hash } from 'bcryptjs';

interface RequestMonitorStarting {
    id: string;
    date: string;
}

import AppError from '../errors/AppError';
import { parseISO, toDate } from 'date-fns';

class StartMonitoringService {
    public async execute({
        id,
        date,
    }: RequestMonitorStarting): Promise<Equipament> {
        const equipamentRepository = getRepository(Equipament);

        const equipament = await equipamentRepository.findOne({
            where: { id },
        });

        if (!equipament) {
            throw new AppError('Equipament not founded.');
        }

        // if (equipament.monitor) {
        //     throw new AppError('Equipament is already being monitored');
        // }

        equipament.monitor = true;
        equipament.dateStartedMonitoring = new Date();
        equipament.dateOfExpiration = parseISO(date);

        await equipamentRepository.save(equipament);

        return equipament;
    }
}

export default StartMonitoringService;
