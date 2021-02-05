import { getRepository } from 'typeorm';
import Job from '../models/Job';

interface RequestJobCreation {
    name: string;
    description: string;
    technician_id: string;
    category_id: string;
    supply_id: string;
}

class CreateJobtService {
    public async execute({
        name,
        description,
        technician_id,
        category_id,
        supply_id,
    }: RequestJobCreation): Promise<Job> {
        const jobsRepository = getRepository(Job);
        const job = jobsRepository.create({
            name,
            description,
            technician_id,
            category_id,
            supply_id,
        });
        await jobsRepository.save(job);
        return job;
    }
}

export default CreateJobtService;
