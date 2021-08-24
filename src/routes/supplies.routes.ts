/* eslint-disable import/extensions */
import { Router } from 'express';

import CreateSuppliesService from '../services/SupplyService/CreateSupplyService';
import ListSupplyById from '../services/SupplyService/ListCategoryServiceById';
import UpdateSupply from '../services/SupplyService/UpdateCategoryService';

import { getRepository } from 'typeorm';
import Supply from '../models/Supply';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const suppliesRouter = Router();

suppliesRouter.use(ensureAuthenticated);

suppliesRouter.get('/', async (request, response) => {
    const supplyRepository = getRepository(Supply);
    const supplies = await supplyRepository.find();
    return response.json(supplies);
});

suppliesRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const SupplyRepository = getRepository(Supply);
    const SupplyToDelete = await SupplyRepository.find({ id });

    if (!SupplyToDelete.length) {
        return response.status(200).send({ message: 'Supply not Found' });
    }

    SupplyRepository.remove(SupplyToDelete);

    return response.status(200).json({ ok: true });
});

suppliesRouter.post('/', async (request, response) => {
    try {
        const { name, pricePerJob, technician_id } = request.body;

        const CreateSuppliesServices = new CreateSuppliesService();
        const supply = await CreateSuppliesServices.execute({
            name,
            pricePerJob,
            technician_id,
        });

        return response.json(supply);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

suppliesRouter.get('/details/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const ListSuppliesServices = new ListSupplyById();
        const supply = await ListSuppliesServices.execute({ id });

        return response.json(supply);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

suppliesRouter.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { name, pricePerJob } = request.body;

        const UpdateSupliesServices = new UpdateSupply();
        const supply = await UpdateSupliesServices.execute({
            id,
            name,
            pricePerJob,
        });

        return response.json(supply);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default suppliesRouter;
