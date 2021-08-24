import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import Supply from '../../models/Supply';

interface RequestSupplyCreation {
    id: string;
}

class ListSupplyById {
    public async execute({ id }: RequestSupplyCreation): Promise<Supply> {
        const suppliesRepository = getRepository(Supply);
        const supply = await suppliesRepository.findOneOrFail({
            id,
        });

        if (!Supply) {
            new AppError('Supply not founded.');
        }

        return supply;
    }
}

export default ListSupplyById;
