import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class Preventives1610806546687 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'preventives',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'equipament_id',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                        isNullable: false,
                    },
                    {
                        name: 'technician_id',
                        type: 'uuid',
                    },
                    {
                        name: 'jobs',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'isCorrective',
                        type: 'boolean',
                        isNullable: false,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'preventives',
            new TableForeignKey({
                name: 'PreventivesEquipament',
                columnNames: ['equipament_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'equipaments',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );

        await queryRunner.createForeignKey(
            'preventives',
            new TableForeignKey({
                name: 'PreventivesTecnician',
                columnNames: ['technician_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('preventives');
    }
}
