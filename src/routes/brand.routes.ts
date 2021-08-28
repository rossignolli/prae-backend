/* eslint-disable import/extensions */
import { Router } from 'express';

import CreateBrandService from '../services/CreateBrandService';

import { getRepository, Table } from 'typeorm';
import Brand from '../models/Brand';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const brandRouter = Router();

brandRouter.use(ensureAuthenticated);

brandRouter.get('/', async (request, response) => {
    const brandRepository = getRepository(Brand);
    const brand = await brandRepository.find();

    return response.json(brand);
});

brandRouter.get('/details/:id', async (request, response) => {
    const { id } = request.params;

    const brandRepository = getRepository(Brand);

    const brand = await brandRepository.findOneOrFail({ id });

    return response.json(brand);
});

brandRouter.put('/:id', async (request, response) => {
    const { id } = request.params;
    const { name, description } = request.body;

    const brandRepository = getRepository(Brand);
    const brand = await brandRepository.findOneOrFail({ id });

    brand.name = name;
    brand.description = description;
    await brandRepository.save(brand);

    return response
        .status(201)
        .json({ sucess: 'Marca atualizada com sucesso' });
});

brandRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;

    const brandRepository = getRepository(Brand);
    await brandRepository.delete({ id });

    return response.status(201).json({ ok: 'true.' });
});

brandRouter.post('/', async (request, response) => {
    try {
        const { name, description, technician_id } = request.body;
        console.log(name, description, technician_id);

        const CreateBrandServices = new CreateBrandService();
        const brand = await CreateBrandServices.execute({
            name,
            description,
            technician_id,
        });

        return response.json(brand);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default brandRouter;
