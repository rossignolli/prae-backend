/* eslint-disable import/extensions */
import { Router } from 'express';
import CreateJobsService from '../services/CreateJobervice';
import createExecutionServices from '../services/CreateExecutionService';

import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ExecutionJob from '../models/JobExecution';
import Job from '../models/Job';

const jobsRouter = Router();

jobsRouter.use(ensureAuthenticated);

jobsRouter.get('/', async (request, response) => {
    const jobsRepository = getRepository(Job);
    const jobs = await jobsRepository.find();
    return response.json(jobs);
});

jobsRouter.get('/execute', async (request, response) => {
    const executionsRepository = getRepository(ExecutionJob);
    const executions = await executionsRepository.find();
    return response.json(executions);
});

jobsRouter.post('/', async (request, response) => {
    try {
        const {
            name,
            description,
            technician_id,
            category_id,
            supply_id,
        } = request.body;
        const CreateJobsServices = new CreateJobsService();
        const job = await CreateJobsServices.execute({
            name,
            description,
            technician_id,
            category_id,
            supply_id,
        });

        return response.json(job);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

jobsRouter.post('/execute', async (request, response) => {
    try {
        const { technician_id, job_id, preventive_id } = request.body;
        const CreateExecutionServices = new createExecutionServices();
        const executionJob = await CreateExecutionServices.execute({
            preventive_id,
            job_id,
            technician_id,
        });

        return response.json(executionJob);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default jobsRouter;
