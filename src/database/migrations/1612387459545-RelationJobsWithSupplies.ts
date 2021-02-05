import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export class RelationJobsWithSupplies1612387459545
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'jobs',
            new TableForeignKey({
                name: 'SuppplyJob',
                columnNames: ['supply_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'supplies',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('jobs', 'SuppplyJob');
    }
}
