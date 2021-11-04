import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddsColumnTotalPriceAction1635970706044
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'preventives',
            new TableColumn({
                name: 'total_price',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn(
            'preventives',
            new TableColumn({
                name: 'total_price',
                type: 'number',
                isNullable: true,
            }),
        );
    }
}
