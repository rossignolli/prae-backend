import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateExecutionJob1612380734374 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'JobExecution',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'technician_id',
                        type: 'uuid',
                    },
                    {
                        name: 'preventive_id',
                        type: 'uuid',
                    },
                    {
                        name: 'job_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'JobExecution',
            new TableForeignKey({
                name: 'PreventiveJobs',
                columnNames: ['preventive_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'preventives',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'JobExecution',
            new TableForeignKey({
                name: 'TechnicianExecution',
                columnNames: ['technician_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('JobExecution');
    }
}
