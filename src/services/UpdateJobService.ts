import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Job from '../models/Job';

interface RequestUpdateJob {
    name: string;
    id: string;
    category_id: string;
    supply_id: string;
}

class UpdateJobService {
    public async execute({
        name,
        id,
        category_id,
        supply_id,
    }: RequestUpdateJob): Promise<Job> {
        const jobRepository = getRepository(Job);
        const job = await jobRepository.findOneOrFail({
            id,
        });

        if (!job) {
            new AppError('Supply not founded.');
        }

        await jobRepository.update({ id }, { category_id, supply_id, name });

        const updatedJob = await jobRepository.findOneOrFail({
            id,
        });

        return updatedJob;
    }
}

export default UpdateJobService;
