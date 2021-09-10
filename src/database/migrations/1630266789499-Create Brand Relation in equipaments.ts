import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class CreateBrandRelationInEquipaments1630266789499
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'equipaments',
            new TableColumn({
                name: 'brand_id',
                type: 'uuid',
            }),
        );
        await queryRunner.createForeignKey(
            'equipaments',
            new TableForeignKey({
                name: 'EquipamentBrand',
                columnNames: ['brand_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'brand',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
