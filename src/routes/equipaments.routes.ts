/* eslint-disable import/extensions */
import { Router } from 'express';

import Equipament from '../models/Equipament';
import { getRepository } from 'typeorm';
import CreateEquipamentService from '../services/CreateEquipamentService';

const equipamentsRouter = Router();

equipamentsRouter.get('/', async (request, response) => {
    const equipamentsRepository = getRepository(Equipament);
    const appointments = await equipamentsRepository.find();
    return response.json(appointments);
});

equipamentsRouter.post('/', async (request, response) => {
    const { name, description } = request.body;

    // Transformação de dados para aplicação usar, pode ser deixado na rota

    const createEquipamentService = new CreateEquipamentService();

    const equipament = await createEquipamentService.execute({
        name,
        description,
    });
    return response.json(equipament);
});

export default equipamentsRouter;
