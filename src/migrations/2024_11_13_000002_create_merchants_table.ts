import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateMerchantsTable20241113000002 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'merchants',
                columns: [
                    { name: 'merchant_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'name', type: 'varchar', length: '30', isUnique: true },
                    { name: 'address', type: 'varchar', length: '50' },
                    { name: 'mcc', type: 'varchar', length: '20', isNullable: true },
                    { name: 'ruc', type: 'varchar', length: '11' },

                    { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
                    { name: 'updated_at', type: 'datetime', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('merchants');
    }

}
