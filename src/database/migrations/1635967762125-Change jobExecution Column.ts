import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export class ChangeJobExecutionColumn1635967762125
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('JobExecution', 'JobsIds');
        await queryRunner.dropColumn('JobExecution', 'job_id');
        await queryRunner.addColumn(
            'JobExecution',
            new TableColumn({
                name: 'job_name',
                type: 'varchar',
                isNullable: true,
            }),
        );
        await queryRunner.addColumn(
            'JobExecution',
            new TableColumn({
                name: 'supply_name',
                type: 'varchar',
                isNullable: true,
            }),
        );
        await queryRunner.addColumn(
            'JobExecution',
            new TableColumn({
                name: 'supply_price',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'JobExecution',
            new TableForeignKey({
                name: 'JobsIds',
                columnNames: ['job_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'jobs',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.addColumn(
            'JobExecution',
            new TableColumn({
                name: 'job_id',
                type: 'uuid',
            }),
        );

        await queryRunner.dropColumn(
            'JobExecution',
            new TableColumn({
                name: 'job_name',
                type: 'varchar',
            }),
        );
        await queryRunner.dropColumn(
            'JobExecution',
            new TableColumn({
                name: 'supply_name',
                type: 'varchar',
            }),
        );
        await queryRunner.dropColumn(
            'JobExecution',
            new TableColumn({
                name: 'supply_price',
                type: 'varchar',
            }),
        );
    }
}
