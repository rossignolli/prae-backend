/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import Job from './Job';
import Preventive from './Preventives';

@Entity('JobExecution')
class JobExecution {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    preventive_id: string;

    @Column()
    job_id: string;

    @Column()
    technician_id: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Preventive, { eager: true })
    @JoinColumn({ name: 'preventive_id' })
    preventive: string;

    @ManyToOne(() => Preventive, preventive => preventive.jobs)
    @JoinColumn({ name: 'preventive_id' })
    preventives: Preventive;

    @ManyToOne(() => Job, { eager: true })
    @JoinColumn({ name: 'job_id' })
    job: string;
}

export default JobExecution;
