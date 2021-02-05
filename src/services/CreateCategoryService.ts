import { getRepository } from 'typeorm';
import Category from '../models/Category';

interface RequestSupplyCreation {
    name: string;
    description: string;
    avatar: string;
    technician_id: string;
}

class CreateCategorytService {
    public async execute({
        name,
        avatar,
        description,
        technician_id,
    }: RequestSupplyCreation): Promise<Category> {
        const categoriesRepository = getRepository(Category);
        const category = categoriesRepository.create({
            name,
            description,
            avatar,
            technician_id,
        });
        await categoriesRepository.save(category);
        return category;
    }
}

export default CreateCategorytService;
