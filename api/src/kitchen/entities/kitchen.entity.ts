import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Index,
} from 'typeorm';

@Entity()
export class Kitchen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 255 })
  phone: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  @Index()
  createdAt: Date;
}
