/* eslint-disable import/extensions */
import { Router } from 'express';
import CreateJobsService from '../services/CreateJobervice';
import createExecutionServices from '../services/CreateExecutionService';

import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Job from '../models/Job';

const jobsRouter = Router();

jobsRouter.use(ensureAuthenticated);

jobsRouter.get('/', async (request, response) => {
    const jobsRepository = getRepository(Job);
    const jobs = await jobsRepository.find();
    return response.json(jobs);
});

jobsRouter.get('/details/:id', async (request, response) => {
    const { id } = request.params;
    const job = getRepository(Job);
    const jobs = await job.findOneOrFail({ id });
    return response.json(jobs);
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

jobsRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;

    const jobsRepository = getRepository(Job);
    await jobsRepository.delete({ id });

    return response.status(201).json({ ok: 'true.' });
});

jobsRouter.put('/:id', async (request, response) => {
    const { id } = request.params;
    const { name, description, category_id, supply_id } = request.body;

    const jobsRepository = getRepository(Job);
    const job = await jobsRepository.findOneOrFail({ id });

    job.name = name;
    job.description = description;
    job.category_id = category_id;
    job.supply_id = supply_id;

    await jobsRepository.save(job);

    return response
        .status(201)
        .json({ sucess: 'Procedimento atualizada com sucesso' });
});

export default jobsRouter;
