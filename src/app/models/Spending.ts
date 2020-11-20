import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('spendings')
export default class Spendings {
      @PrimaryGeneratedColumn('increment')
      id: number;

      @Column()
      title: string;

      @Column()
      price: number;

      @Column({ nullable: true })
      tag: string;

      @ManyToOne(() => User, (user) => user.spendings, {
        cascade: [
          'insert',
          'update',
        ],
      })
      @JoinColumn({ name: 'user_id' })
      user: User;

      @CreateDateColumn({ name: 'created_at' })
      created_at: Date;
}
