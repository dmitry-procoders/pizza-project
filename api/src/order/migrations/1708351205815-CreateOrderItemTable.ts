import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderItemTable1708351205815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order-item',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
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

    await queryRunner.createForeignKeys('order-item', [
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
    await queryRunner.dropTable('order-item');
  }
}
