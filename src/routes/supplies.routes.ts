/* eslint-disable import/extensions */
import { Router } from 'express';

import CreateSuppliesService from '../services/CreateSupplyService';

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

export default suppliesRouter;
