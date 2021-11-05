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

        job.name = name;
        job.category_id = category_id;
        job.supply_id = supply_id;

        const updatedJob = await jobRepository.save(job);

        return updatedJob;
    }
}

export default UpdateJobService;
