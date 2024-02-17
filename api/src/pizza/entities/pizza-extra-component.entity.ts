import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PizzaExtraComponentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  value: string;

  @Column()
  description: string;

  @Column({ length: 255 })
  image: string;

  @Column({ default: true })
  status: boolean;
}
