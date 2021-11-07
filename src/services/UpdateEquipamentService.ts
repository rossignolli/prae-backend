import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Equipament from '../models/Equipament';
import Image from '../models/Images';
import aws from 'aws-sdk';

type ImagesType = {
    id: string;
    path: string;
};

interface RequestUpdateEquipament {
    name: string;
    id: string;
    description: string;
    brand_id: string;
    category_id: string;
    date?: string;
    images: Array<ImagesType>;
    deletedImages: any;
}

class UpdateEquipamentService {
    public async execute({
        name,
        description,
        category_id,
        brand_id,
        date,
        deletedImages,
        images,
        id,
    }: RequestUpdateEquipament): Promise<Equipament> {
        const equipamentRepository = getRepository(Equipament);
        const imageRepository = getRepository(Image);

        deletedImages.map(async (image: ImagesType) => {
            const imageToDelete = image.path.split('/').pop();

            if (imageToDelete) {
                const s3 = new aws.S3();
                const params = {
                    Bucket: 'static-prae',
                    Key: imageToDelete,
                };

                try {
                    await s3.headObject(params).promise();
                    console.log(
                        '[Sucess] Image found. Trying to remove it from storage',
                    );
                    try {
                        await s3.deleteObject(params).promise();
                        console.log('Deleting image from bucket ');
                    } catch (err) {
                        console.log('ERROR in file : ' + JSON.stringify(err));
                    }
                } catch (err) {
                    console.log('File not Found');
                }

                console.log('Deleting image from database');

                await imageRepository.delete({ id: image.id });
            }
        });

        const equipament = await equipamentRepository.findOneOrFail({
            id,
        });

        if (!equipament) {
            new AppError('Equipament not founded.');
        }

        images.map(async image => {
            const newImage = new Image();
            newImage.equipament_id = id;
            newImage.path = image.path;
            await imageRepository.save(newImage);
        });

        await equipamentRepository.save(equipament);

        await equipamentRepository.update(
            { id },
            {
                category_id,
                brand_id,
                name,
                description,
                dateOfExpiration: date,
            },
        );

        const updatedEquipament = await equipamentRepository.findOneOrFail({
            id,
        });

        return updatedEquipament;
    }
}

export default UpdateEquipamentService;
