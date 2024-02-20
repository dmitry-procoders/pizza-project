import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class PizzaSizeMigration1708350373874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pizza_size',
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
            name: 'status',
            type: 'boolean',
            default: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('pizza_size')
      .values([
        { value: 'Small', description: 'Small size pizza', status: true },
        { value: 'Medium', description: 'Medium size pizza', status: true },
        { value: 'Large', description: 'Large size pizza', status: true },
      ])
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pizza_size');
  }
}
