/* eslint-disable prettier/prettier */
import { uuid } from 'uuidv4';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
    ManyToOne,
} from 'typeorm';
import Job from './Job';
import User from './User';

@Entity('supplies')
class Supply {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    pricePerJob: number;

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

export default Supply;
