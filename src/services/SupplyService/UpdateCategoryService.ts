import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Supply from '../../models/Supply';

interface RequestSupplyCreation {
    name: string;
    id: string;
    pricePerJob: number;
}

class UpdateSupplytService {
    public async execute({
        name,
        id,
        pricePerJob,
    }: RequestSupplyCreation): Promise<Supply> {
        const suppliesRepository = getRepository(Supply);
        const supply = await suppliesRepository.findOneOrFail({
            id,
        });

        if (!supply) {
            new AppError('Supply not founded.');
        }

        supply.name = name;
        supply.pricePerJob = pricePerJob;

        const updatedCategory = await suppliesRepository.save(supply);

        return updatedCategory;
    }
}

export default UpdateSupplytService;
