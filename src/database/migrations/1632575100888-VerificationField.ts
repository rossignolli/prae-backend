import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class VerificationField1632575100888 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'isActive',
                type: 'boolean',
                isNullable: false,
                default: false,
            }),
        );
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'verification',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'isActive');
        await queryRunner.dropColumn('users', 'verification');
    }
}
