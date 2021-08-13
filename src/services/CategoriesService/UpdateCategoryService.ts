import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Category from '../../models/Category';

interface RequestSupplyCreation {
    name: string;
    id: string;
    description: string;
    avatar: string;
    technician_id: string;
}

class UpdateCategorytService {
    public async execute({
        name,
        avatar,
        id,
        description,
        technician_id,
    }: RequestSupplyCreation): Promise<Category> {
        const categoriesRepository = getRepository(Category);
        const categoryToupdate = await categoriesRepository.findOne({ id });

        if (categoryToupdate) {
            new AppError('Equipament not founded.');
        }

        const category = categoriesRepository.save({
            name,
            description,
            avatar,
            technician_id,
        });

        return category;
    }
}

export default UpdateCategorytService;
