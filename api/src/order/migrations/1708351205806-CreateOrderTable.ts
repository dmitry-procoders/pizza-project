import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderTable1708351205812 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'isBilledOnline',
            type: 'boolean',
          },
          {
            name: 'createdAt',
            type: 'timestamp with time zone',
            default: 'NOW()',
          },
          {
            name: 'status',
            type: 'varchar',
            length: '50',
          },
          {
            name: 'pizzaSizeId',
            type: 'int',
          },
          {
            name: 'pizzaTypeId',
            type: 'int',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKeys('order', [
      new TableForeignKey({
        columnNames: ['pizzaSizeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pizza_size',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['pizzaTypeId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pizza_type',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order');
  }
}
