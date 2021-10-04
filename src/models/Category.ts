/* eslint-disable prettier/prettier */
import { uuid } from 'uuidv4';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import User from './User';

@Entity('categories')
class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    avatar: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    technician_id: string;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'technician_id' })
    technician: User;
}

export default Category;
