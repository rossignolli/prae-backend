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

import CreateAppointmentService from '../services/CreateRegisterPreventiveServices';
import StartMonitoringService from '../services/StartMonitoringEquipamentService';
import { getRepository } from 'typeorm';
import Preventive from '../models/Preventives';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const preventivesRouter = Router();

preventivesRouter.use(ensureAuthenticated);

preventivesRouter.get('/', async (request, response) => {
    const preventivesRepository = getRepository(Preventive);
    const preventives = await preventivesRepository.find();
    return response.json(preventives);
});

preventivesRouter.post('/monitor', async (request, response) => {
    try {
        const { date } = request.body;
        const { equipamentId } = request.query;

        const createMonirtoringService = new StartMonitoringService();
        const equipament = await createMonirtoringService.execute({
            id: equipamentId as string,
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

        return response.json(equipament);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

preventivesRouter.post('/', async (request, response) => {
    const { equipament_id, technician_id, jobs, isCorrective } = request.body;

    // const parsedDate = parseISO(date);

    // Transformação de dados para aplicação usar, pode ser deixado na rota

    const createAppointmentService = new CreateAppointmentService();
    const appointment = await createAppointmentService.execute({
        equipament_id,
        technician_id,
        jobs,
        isCorrective,
    });
    return response.json(appointment);
});

export default preventivesRouter;
