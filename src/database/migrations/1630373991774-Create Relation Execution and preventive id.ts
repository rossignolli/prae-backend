import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class CreateRelationExecutionAndPreventiveId1630373991774
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'JobExecution',
            new TableForeignKey({
                name: 'JobExecutionPreventive',
                columnNames: ['preventive_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'preventives',
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
