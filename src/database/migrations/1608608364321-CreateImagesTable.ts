import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateImagesTable1608608364321 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'images',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'path',
                        type: 'varchar',
                    },
                    {
                        name: 'equipament_id',
                        type: 'uuid',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'ImageEquipament',
                        referencedTableName: 'equipaments',
                        columnNames: ['equipament_id'],
                        referencedColumnNames: ['id'],
                        onUpdate: 'CASCADE',
                        onDelete: 'CASCADE',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('images');
    }
}
