/* eslint-disable import/extensions */
import { Router } from 'express';
import {
    startOfHour,
    parseISO,
    differenceInDays,
    parse,
    toDate,
    differenceInBusinessDays,
} from 'date-fns';

import CreateJobExecutionAndPreventive from '../services/CreateJobExecutionAndPreventive';
import StartMonitoringService from '../services/StartMonitoringEquipamentService';
import { getRepository } from 'typeorm';
import Preventive from '../models/Preventives';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import JobExecution from '../models/JobExecution';

const preventivesRouter = Router();

preventivesRouter.use(ensureAuthenticated);

preventivesRouter.get('/', async (request, response) => {
    const preventivesRepository = getRepository(Preventive);
    const preventives = await preventivesRepository.find();
    return response.json(preventives);
});

preventivesRouter.get('/equipament/:id', async (request, response) => {
    const { id } = request.params;
    const preventivesRepository = getRepository(Preventive);
    const preventives = await preventivesRepository.find({
        where: { equipament_id: id },
    });
    return response.json(preventives);
});

preventivesRouter.get('/details/:id', async (request, response) => {
    const { id } = request.params;

    const preventivesRepository = getRepository(JobExecution);

    const preventives = await preventivesRepository.find({
        where: { preventive_id: id },
    });

    return response.json(preventives);
});

preventivesRouter.get('/details/:id', async (request, response) => {
    const { id } = request.params;

    const preventivesRepository = getRepository(JobExecution);

    const preventives = await preventivesRepository.find({
        where: { preventive_id: id },
    });

    return response.json(preventives);
});

preventivesRouter.post('/monitor/:id', async (request, response) => {
    const { id } = request.params;

    try {
        const { date } = request.body;

        const createMonirtoringService = new StartMonitoringService();
        const equipament = await createMonirtoringService.execute({
            id,
            date,
        });

        const calcDate = differenceInDays(
            equipament.dateOfExpiration,
            new Date(),
        );

        const calcDateBusinessDays = differenceInBusinessDays(
            equipament.dateOfExpiration,
            new Date(),
        );

        console.log(
            `Equipament "${equipament.name}" is expiring in ${calcDate} or ${calcDateBusinessDays} in business Days`,
        );

        return response.json({
            sucess: `Equipament "${equipament.name}" is expiring in ${calcDate} or ${calcDateBusinessDays} in business Days`,
        });
    } catch (err) {
        return response.status(400).json({ error: 'Algo deu errado' });
    }
});

preventivesRouter.post('/', async (request, response) => {
    const { equipament_id, technician_id, isCorrective, jobs } = request.body;

    // Transformação de dados para aplicação usar, pode ser deixado na rota

    // 1 => Gerar  uma Preventive ID
    // 2 => Criar uma Job Execution com o Preventive ID
    // 3 => Gerar uma Job Execution para cada item do array de jobs

    const createJobExecutionAndPreventive = new CreateJobExecutionAndPreventive();
    const JobExecution = await createJobExecutionAndPreventive.execute({
        equipament_id,
        technician_id,
        isCorrective,
        jobs,
    });

    return response.json(JobExecution);
});

export default preventivesRouter;
