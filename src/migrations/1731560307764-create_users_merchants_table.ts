import { MigrationInterface, QueryRunner, Table, TableIndex, TableForeignKey } from "typeorm";

export class CreateUsersMerchants1731560307764 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_merchants',
                columns: [
                    { name: 'user_merchant_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'user_id', type: 'int' },
                    { name: 'merchant_id', type: 'int' },

                    { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
                    { name: 'updated_at', type: 'datetime', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                ],
                foreignKeys: [
                    {
                        columnNames: ['user_id'],
                        referencedTableName: 'users',
                        referencedColumnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                    {
                        columnNames: ['merchant_id'],
                        referencedTableName: 'merchants',
                        referencedColumnNames: ['merchant_id'],
                        onDelete: 'NO ACTION',
                        onUpdate: 'NO ACTION',
                    }
                ],
                indices: [
                    {
                        // name: 'IDX_user_merchant_unique',
                        // name: 'UQ_b9fdfae91d6c4cd96d79e52bba',
                        columnNames: ['user_id', 'merchant_id'],
                        isUnique: true,
                    },
                ],
            })
        );

        // await queryRunner.createIndex(
        //     'users_merchants',
        //     new TableIndex({
        //         name: 'UQ_b9fdfae91d6c4cd96d79e52bba',
        //         columnNames: ['merchant_id', 'user_id'],
        //         isUnique: true,
        //     })
        // );

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_merchants');
    }

}
