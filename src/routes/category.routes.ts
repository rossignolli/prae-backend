/* eslint-disable import/extensions */
import { Router } from 'express';

import CreateCategoriesService from '../services/CreateCategoryService';

import { getRepository } from 'typeorm';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import Category from '../models/Category';

const categoryRouter = Router();

categoryRouter.use(ensureAuthenticated);

categoryRouter.get('/', async (request, response) => {
    const categoryRepository = getRepository(Category);
    const categories = await categoryRepository.find();
    return response.json(categories);
});

categoryRouter.post('/', async (request, response) => {
    try {
        const { name, avatar, technician_id, description } = request.body;

        const CreateCategoriesServices = new CreateCategoriesService();
        const category = await CreateCategoriesServices.execute({
            name,
            avatar,
            technician_id,
            description,
        });

        return response.json(category);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default categoryRouter;
