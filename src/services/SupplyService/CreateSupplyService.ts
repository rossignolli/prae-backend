import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Supply from '../../models/Supply';

interface RequestSupplyCreation {
    name: string;
    pricePerJob: number;
    technician_id: string;
}

class CreateSupplytService {
    public async execute({
        name,
        technician_id,
        pricePerJob,
    }: RequestSupplyCreation): Promise<Supply> {
        const supplysRepository = getRepository(Supply);

        if (pricePerJob <= 0) {
            throw new AppError('Price per Job can not be negative or zero');
        }

        //@ts-ignore
        const supply = supplysRepository.create({
            name,
            technician_id,
            pricePerJob: parseFloat(pricePerJob.toString().replace(',', '.')),
        });

        await supplysRepository.save(supply);

        return supply;
    }
}

export default CreateSupplytService;
