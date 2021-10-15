import { differenceInDays, addDays } from 'date-fns';
import Preventive from '../models/Preventives';

import { getRepository } from 'typeorm';

interface RequestDTO {
    equipament_id: string;
    technician_id: string;
    jobs: Array<{
        id: string;
    }>;
    isCorrective: boolean;
}

import AppError from '../errors/AppError';
import JobExecution from '../models/JobExecution';
import Equipament from '../models/Equipament';

class CreateJobsExecutionAndPreventive {
    public async execute({
        equipament_id,
        technician_id,
        isCorrective,
        jobs,
    }: RequestDTO): Promise<Preventive> {
        const preventiveRepository = getRepository(Preventive);
        const jobExecutionRepository = getRepository(JobExecution);
        const equipamentRepository = getRepository(Equipament);

        const EquipamentToUpdate = await equipamentRepository.findOneOrFail({
            where: { id: equipament_id },
        });

        if (!EquipamentToUpdate.dateStartedMonitoring) {
            throw new AppError('This equipament is not monitored.');
        }

        const preventive = preventiveRepository.create({
            equipament_id,
            technician_id,
            isCorrective,
        });

        const createdPreventive = await preventiveRepository.save(preventive);

        jobs.map(async job => {
            const JobItem = jobExecutionRepository.create({
                preventive_id: createdPreventive.id,
                technician_id,
                job_id: job.id,
            });
            await jobExecutionRepository.save(JobItem);
        });

        const calcDate = differenceInDays(
            EquipamentToUpdate.dateOfExpiration,
            EquipamentToUpdate.dateStartedMonitoring,
        );

        const newDateExpiration = addDays(Date.now(), calcDate);

        EquipamentToUpdate.dateOfExpiration = newDateExpiration;

        await equipamentRepository.save(EquipamentToUpdate);

        return preventive;
    }
}

export default CreateJobsExecutionAndPreventive;
