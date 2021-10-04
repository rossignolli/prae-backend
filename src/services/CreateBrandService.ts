import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Brand from '../models/Brand';

interface RequestBrandCreation {
    name: string;
    description: string;
    technician_id: string;
}

class CreateBrandtService {
    public async execute({
        name,
        description,
        technician_id,
    }: RequestBrandCreation): Promise<Brand> {
        const brandRepository = getRepository(Brand);

        const brand = brandRepository.create({
            name,
            technician_id,
            description,
        });

        await brandRepository.save(brand);

        return brand;
    }
}

export default CreateBrandtService;
