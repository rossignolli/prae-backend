import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export class CreateEquipaments1608600415187 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.createTable(
            new Table({
                name: 'equipaments',
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
                        name: 'name',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        isNullable: false,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'monitor',
                        type: 'boolean',
                        default: true,
                        isNullable: false,
                    },
                    {
                        name: 'critical',
                        type: 'boolean',
                        default: false,
                        isNullable: false,
                    },
                    {
                        name: 'levelToManage',
                        type: 'int',
                        default: 0,
                        isNullable: false,
                    },
                    {
                        name: 'dateStartedMonitoring',
                        type: 'timestamp with time zone',
                        isNullable: true,
                    },
                    {
                        name: 'dateOfExpiration',
                        type: 'timestamp with time zone',
                        isNullable: true,
                    },
                    {
                        name: 'dateLastStopMonitor',
                        type: 'timestamp with time zone',
                        isNullable: true,
                    },
                    {
                        name: 'timesStopped',
                        type: 'int',
                        default: 0,
                        isNullable: true,
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'equipaments',
            new TableForeignKey({
                name: 'EquipamentTechnician',
                columnNames: ['technician_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('equipaments');
    }
}
