import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterIdAppointment1602159693142 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'id');
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'id',
                type: 'uuid',
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('appointments', 'id');
        await queryRunner.addColumn(
            'appointments',
            new TableColumn({
                name: 'id',
                type: 'uuid',
                isPrimary: true,
                generationStrategy: 'uuid',
                default: 'uuid_generate_v4()',
            }),
        );
    }
}
