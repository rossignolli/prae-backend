/* eslint-disable import/extensions */
import { Router } from 'express';

import Equipament from '../models/Equipament';
import { getRepository } from 'typeorm';
import CreateEquipamentService from '../services/CreateEquipamentService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import { differenceInBusinessDays, differenceInDays, isPast } from 'date-fns';
import multer from 'multer';
import uploadConfig from '../config/upload';

const equipamentsRouter = Router();
const upload = multer(uploadConfig);

equipamentsRouter.use(ensureAuthenticated);

equipamentsRouter.get('/details/:id', async (request, response) => {
    const { id } = request.params;

    const equipamentsRepository = getRepository(Equipament);

    const equipament = await equipamentsRepository.findOneOrFail({ id });

    return response.json(equipament);
});

equipamentsRouter.get('/', async (request, response) => {
    const equipamentsRepository = getRepository(Equipament);

    const equipaments = await equipamentsRepository.find({
        relations: ['images'],
    });

    equipaments.forEach(equipament => {
        equipament.expired = isPast(equipament.dateOfExpiration);

        const calcDateBusinessDays = differenceInBusinessDays(
            equipament.dateOfExpiration,
            new Date(),
        );
    });

    return response.json(equipaments);
});

equipamentsRouter.post(
    '/',
    upload.array('images'),
    async (request, response) => {
        const { data } = request.body;

        // Transformação de dados para aplicação usar, pode ser deixado na rota

        const requestImages = request.files as Express.Multer.File[];

        const images = requestImages.map(image => {
            return { path: image.filename };
        });

        const parsedEquipament = JSON.parse(data);

        parsedEquipament.images = images;

        const createEquipamentService = new CreateEquipamentService();

        const equipament = await createEquipamentService.execute(
            parsedEquipament,
        );

        return response.json(equipament);
    },
);

export default equipamentsRouter;
