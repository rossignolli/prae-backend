/* eslint-disable import/extensions */
import { Router } from 'express';

import Equipament from '../models/Equipament';
import { getRepository } from 'typeorm';
import CreateEquipamentService from '../services/CreateEquipamentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { differenceInBusinessDays, differenceInDays, isPast } from 'date-fns';

const equipamentsRouter = Router();

equipamentsRouter.use(ensureAuthenticated);

equipamentsRouter.get('/details/:id', async (request, response) => {
    const { id } = request.params;

    console.log(id);

    const equipamentsRepository = getRepository(Equipament);

    const equipament = await equipamentsRepository.findOneOrFail({ id });

    return response.json(equipament);
});

equipamentsRouter.get('/', async (request, response) => {
    const equipamentsRepository = getRepository(Equipament);

    const equipaments = await equipamentsRepository.find();

    equipaments.forEach(equipament => {
        equipament.expired = isPast(equipament.dateOfExpiration);

        const calcDateBusinessDays = differenceInBusinessDays(
            equipament.dateOfExpiration,
            new Date(),
        );
    });

    return response.json(equipaments);
});

equipamentsRouter.post('/', async (request, response) => {
    const {
        name,
        description,
        technician_id,
        monitor,
        critical,
        levelToManage,
        category_id,
    } = request.body;

    // Transformação de dados para aplicação usar, pode ser deixado na rota

    const createEquipamentService = new CreateEquipamentService();

    const equipament = await createEquipamentService.execute({
        name,
        description,
        technician_id,
        monitor,
        critical,
        levelToManage,
        category_id,
    });
    return response.json(equipament);
});

export default equipamentsRouter;
