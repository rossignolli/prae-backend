/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';

import User from './User';
import Equipament from './Equipament';
import Job from './Job';
import JobExecution from './JobExecution';

@Entity('preventives')
class Preventive {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    equipament_id: string;

    @ManyToOne(() => Equipament, { eager: true })
    @JoinColumn({ name: 'equipament_id' })
    equipament: Equipament;

    @Column()
    technician_id: string;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'technician_id' })
    technician: User;

    @CreateDateColumn()
    created_at: Date;

    @JoinColumn({ name: 'preventive_id' })
    jobs: JobExecution[];

    @Column()
    isCorrective: boolean;

    @Column()
    total_price: string;
}

export default Preventive;
