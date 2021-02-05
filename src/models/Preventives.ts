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

    @ManyToOne(() => User)
    @JoinColumn({ name: 'technician_id' })
    technician: string;

    @CreateDateColumn()
    created_at: Date;

    @OneToMany(() => JobExecution, JobExecution => JobExecution.preventives, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'preventive_id' })
    jobs: JobExecution[];

    // @OneToMany(() => Job, job => job.preventives, {
    //     cascade: ['insert', 'update'],
    // })
    // @JoinColumn({ name: 'preventive_id' })
    // jobs: Job[];

    @Column()
    isCorrective: boolean;
}

export default Preventive;
