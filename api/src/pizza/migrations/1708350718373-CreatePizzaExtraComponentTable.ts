import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePizzaExtraComponentTable1708350718373
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pizza_extra_component',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'value',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'image',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'status',
            type: 'boolean',
            default: true,
          },
        ],
      }),
      true,
    );

    const mockRecords = [
      {
        value: 'Extra Cheese',
        description: 'Add extra cheese to your pizza.',
        image: 'extra_cheese.jpg',
        status: true,
      },
      {
        value: 'Olives',
        description: 'Add sliced olives to your pizza.',
        image: 'olives.jpg',
        status: true,
      },
      {
        value: 'Onions',
        description: 'Add sliced onions to your pizza.',
        image: 'onions.jpg',
        status: true,
      },
      {
        value: 'Bell Peppers',
        description: 'Add sliced bell peppers to your pizza.',
        image: 'bell_peppers.jpg',
        status: true,
      },
      {
        value: 'Mushrooms',
        description: 'Add sliced mushrooms to your pizza.',
        image: 'mushrooms.jpg',
        status: true,
      },
    ];

    await queryRunner.manager
      .getRepository('pizza_extra_component')
      .insert(mockRecords);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pizza_extra_component');
  }
}
