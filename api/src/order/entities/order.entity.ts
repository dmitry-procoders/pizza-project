import { PizzaExtraComponentEntity } from 'src/pizza/entities/pizza-extra-component.entity';
import { PizzaSizeEntity } from 'src/pizza/entities/pizza-size.entity';
import { PizzaTypeEntity } from 'src/pizza/entities/pizza-type.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Index,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  phone: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  @Index()
  createdAt: Date;

  @OneToMany(() => PizzaTypeEntity, (pizzaType) => pizzaType.orders, {
    cascade: true,
  })
  pizzaType: PizzaTypeEntity;

  @OneToMany(() => PizzaSizeEntity, (pizzaSize) => pizzaSize.orders, {
    cascade: true,
  })
  pizzaSize: PizzaSizeEntity;

  @ManyToMany(
    () => PizzaExtraComponentEntity,
    (pizzaExtraComponent) => pizzaExtraComponent.orders,
    { cascade: true },
  )
  pizzaExtraComponents: PizzaExtraComponentEntity[];
}