import { getRepository } from 'typeorm';
import Equipament from '../models/Equipament';

type ImagesType = {
    id: string;
    path: string;
};

interface RequestEquipamentCreation {
    technician_id: string;
    name: string;
    description: string;
    monitor: boolean;
    critical: boolean;
    levelToManage: number;
    category_id: string;
    brand_id: string;
    images: Array<ImagesType>;
}

class CreateEquipamentService {
    public async execute({
        technician_id,
        name,
        description,
        monitor,
        critical,
        levelToManage,
        category_id,
        brand_id,
        images,
    }: RequestEquipamentCreation): Promise<Equipament> {
        const equipamentsRepository = getRepository(Equipament);

        const equipament = equipamentsRepository.create({
            technician_id,
            name,
            description,
            monitor,
            critical,
            images,
            levelToManage,
            brand_id,
            category_id,
        });

        await equipamentsRepository.save(equipament);

        return equipament;
    }
}

export default CreateEquipamentService;
