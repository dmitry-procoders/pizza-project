import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateOrderPizzaExtraComponentTable1708351846090
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'order_item_pizza_extra_components',
        columns: [
          {
            name: 'orderItemId',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'pizzaExtraComponentId',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKeys('order_item_pizza_extra_components', [
      new TableForeignKey({
        columnNames: ['orderItemId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'order-item',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      new TableForeignKey({
        columnNames: ['pizzaExtraComponentId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'pizza_extra_component',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order_item_pizza_extra_components');
  }
}
