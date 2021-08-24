import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Category from '../../models/Category';

interface RequestSupplyCreation {
    id: string;
}

class ListCategoryById {
    public async execute({ id }: RequestSupplyCreation): Promise<Category> {
        const categoriesRepository = getRepository(Category);
        const category = await categoriesRepository.findOneOrFail({
            id,
        });

        if (!category) {
            new AppError('Equipament not founded.');
        }

        return category;
    }
}

export default ListCategoryById;
