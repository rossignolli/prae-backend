/* eslint-disable import/extensions */
import { Router } from 'express';

import CreateCategoriesService from '../services/CategoriesService/CreateCategoryService';
import UpdateCategorytService from '../services/CategoriesService/UpdateCategoryService';
import ListByIdCategorytService from '../services/CategoriesService/ListCategoryServiceById';

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

categoryRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const categoryRepository = getRepository(Category);
    const categoryToDelete = await categoryRepository.find({ id });

    if (!categoryToDelete.length) {
        return response.status(200).send({ message: 'Category not Found' });
    }

    categoryRepository.remove(categoryToDelete);

    return response.status(200).json({ ok: true });
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

categoryRouter.get('/details/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const ListCategoriesServices = new ListByIdCategorytService();
        const category = await ListCategoriesServices.execute({ id });

        return response.json(category);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

categoryRouter.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { name, description } = request.body;

        const CreateCategoriesServices = new UpdateCategorytService();
        const category = await CreateCategoriesServices.execute({
            id,
            name,
            description,
        });

        return response.json(category);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default categoryRouter;
