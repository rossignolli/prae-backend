import { getRepository } from 'typeorm';
import Equipament from '../models/Equipament';

interface RequestEquipamentCreation {
    name: string;
    description: string;
}

class CreateEquipamentService {
    public async execute({
        name,
        description,
    }: RequestEquipamentCreation): Promise<Equipament> {
        const equipamentsRepository = getRepository(Equipament);

        const equipament = equipamentsRepository.create({
            name,
            description,
        });

        await equipamentsRepository.save(equipament);

        return equipament;
    }
}

export default CreateEquipamentService;
