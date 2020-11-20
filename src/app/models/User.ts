import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinColumn,
} from 'typeorm';

import Spendings from './Spending';

@Entity('users')
export default class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password_hash: string;

    @Column()
    goal: number;

    @CreateDateColumn({ name: 'created_at' })
    created_at: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: Date;

    @OneToMany(() => Spendings, (spend) => spend.user, {
      cascade: [
        'insert',
        'update',
      ],
    })
    @JoinColumn({ name: 'user_id' })
    spendings: Spendings
}
