import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Category from '../../models/Category';

interface RequestSupplyCreation {
    name: string;
    id: string;
    description: string;
}

class UpdateCategorytService {
    public async execute({
        name,
        id,
        description,
    }: RequestSupplyCreation): Promise<Category> {
        const categoriesRepository = getRepository(Category);
        const category = await categoriesRepository.findOneOrFail({
            id,
        });

        if (!category) {
            new AppError('Equipament not founded.');
        }

        category.name = name;
        category.description = description;

        const updatedCategory = await categoriesRepository.save(category);

        return updatedCategory;
    }
}

export default UpdateCategorytService;
