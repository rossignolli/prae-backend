import { getRepository } from 'typeorm';
import Equipament from '../models/Equipament';

interface RequestEquipamentCreation {
    technician_id: string;
    name: string;
    description: string;
    monitor: boolean;
    critical: boolean;
    levelToManage: number;
    category_id: string;
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
    }: RequestEquipamentCreation): Promise<Equipament> {
        const equipamentsRepository = getRepository(Equipament);

        const equipament = equipamentsRepository.create({
            technician_id,
            name,
            description,
            monitor,
            critical,
            levelToManage,
            category_id,
        });

        await equipamentsRepository.save(equipament);

        return equipament;
    }
}

export default CreateEquipamentService;
