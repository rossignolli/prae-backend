import { getRepository } from 'typeorm';
import JobExecution from '../models/JobExecution';

interface RequestExecutionCreation {
    job_id: string;
    technician_id: string;
    preventive_id: string;
}

class CreateExecutiontService {
    public async execute({
        job_id,
        technician_id,
        preventive_id,
    }: RequestExecutionCreation): Promise<JobExecution> {
        const executionRepository = getRepository(JobExecution);
        const execution = executionRepository.create({
            job_id,
            technician_id,
            preventive_id,
        });
        await executionRepository.save(execution);
        return execution;
    }
}

export default CreateExecutiontService;
