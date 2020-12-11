import {
  MigrationInterface, QueryRunner, Table,
} from 'typeorm';

export class createSpending1605877903873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'spendings',
      columns: [
        {
          name: 'id',
          type: 'integer',
          unsigned: true,
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'title',
          type: 'varchar',
        },
        {
          name: 'price',
          type: 'decimal',
          precision: 9,
          scale: 2,
        },
        {
          name: 'description',
          type: 'text',
        },
        {
          name: 'user_id',
          type: 'integer',
        },
        {
          name: 'created_at',
          type: 'timestamp',
        },
      ],
      foreignKeys: [
        {
          name: 'userSpendings',
          columnNames: ['user_id'],
          referencedTableName: 'users',
          referencedColumnNames: ['id'],
        },
      ],
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('spendings');
  }
}
