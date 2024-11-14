import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateUsersTable20241113000001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    { name: 'user_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'first_name', type: 'varchar', length: '20' },
                    { name: 'last_name', type: 'varchar', length: '20' },
                    { name: 'email', type: 'varchar', length: '30', isUnique: true },
                    { name: 'password', type: 'varchar', length: '100' },
                    { name: 'is_active', type: 'tinyint', default: 1 },
                    { name: 'profile_id', type: 'int', isNullable: true },

                    { name: 'created_at', type: 'datetime', default: 'CURRENT_TIMESTAMP' },
                    { name: 'updated_at', type: 'datetime', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                ],
                foreignKeys: [
                    {
                        columnNames: ['profile_id'],
                        referencedTableName: 'profiles',
                        referencedColumnNames: ['profile_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
