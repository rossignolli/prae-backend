/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
    OneToOne,
    OneToMany,
} from 'typeorm';

import Supply from './Supply';
import Preventive from './Preventives';
import User from './User';
import Category from './Category';

@Entity('jobs')
class Job {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    technician_id: string;

    @Column()
    category_id: string;

    @Column()
    supply_id: string;

    @ManyToOne(() => Category, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: string;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'technician_id' })
    user: string;

    @ManyToOne(() => Supply, { eager: true })
    @JoinColumn({ name: 'supply_id' })
    supply: string;

    // @ManyToOne(() => Preventive, preventive => preventive.jobs)
    // @JoinColumn({ name: 'preventives_id' })
    // preventives: Preventive;
}

export default Job;
