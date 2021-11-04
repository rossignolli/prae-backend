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
import Job from '../models/Job';

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
        const jobRepository = getRepository(Job);
        const Prices: number[] = [];

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
            const JobInfo = await jobRepository.findOne({ id: job.id });

            if (!JobInfo) {
                throw new AppError(
                    'One or more jobs provided were not found and the maintenance cannot be created',
                );
            }

            Prices.push(parseFloat(JobInfo.supply.pricePerJob));

            const JobItem = jobExecutionRepository.create({
                preventive_id: createdPreventive.id,
                technician_id,
                job_name: JobInfo.name,
                supply_name: JobInfo.supply.name,
                supply_price: JobInfo.supply.pricePerJob,
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

        createdPreventive.total_price = Prices.reduce(
            (a, b) => a + b,
            0,
        ).toString();

        await preventiveRepository.save(createdPreventive);

        return preventive;
    }
}

export default CreateJobsExecutionAndPreventive;
