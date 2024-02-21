import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePizzaTypeTable1708350658915 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pizza_type',
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
        value: 'Margherita',
        description:
          'Classic Italian pizza with tomato sauce, mozzarella cheese, and basil leaves.',
        image: 'margherita.jpg',
        status: true,
      },
      {
        value: 'Pepperoni',
        description:
          'Pizza topped with pepperoni slices and mozzarella cheese.',
        image: 'pepperoni.jpg',
        status: true,
      },
      {
        value: 'Hawaiian',
        description: 'Pizza topped with ham, pineapple, and mozzarella cheese.',
        image: 'hawaiian.jpg',
        status: true,
      },
      {
        value: 'Mushroom',
        description: 'Pizza topped with mushrooms and mozzarella cheese.',
        image: 'mushroom.jpg',
        status: true,
      },
      {
        value: 'BBQ Chicken',
        description:
          'Pizza topped with BBQ chicken, red onions, and mozzarella cheese.',
        image: 'bbq_chicken.jpg',
        status: true,
      },
      {
        value: 'Supreme',
        description:
          'Pizza topped with pepperoni, sausage, bell peppers, onions, and mozzarella cheese.',
        image: 'supreme.jpg',
        status: true,
      },
      {
        value: 'Vegetarian',
        description:
          'Pizza topped with assorted vegetables and mozzarella cheese.',
        image: 'vegetarian.jpg',
        status: true,
      },
      {
        value: 'Meat Lovers',
        description:
          'Pizza topped with pepperoni, sausage, bacon, and mozzarella cheese.',
        image: 'meat_lovers.jpg',
        status: true,
      },
      {
        value: 'Four Cheese',
        description:
          'Pizza topped with mozzarella, cheddar, feta, and parmesan cheese.',
        image: 'four_cheese.jpg',
        status: true,
      },
    ];

    await queryRunner.manager.getRepository('pizza_type').insert(mockRecords);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pizza_type');
  }
}
