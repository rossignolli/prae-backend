/* eslint-disable prettier/prettier */
import { uuid } from 'uuidv4';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    JoinColumn,
    ManyToOne,
} from 'typeorm';

import User from './User';
import Equipament from './Equipament';

@Entity('preventives')
class Preventive {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    equipament_id: string;

    @ManyToOne(() => Equipament)
    @JoinColumn({ name: 'equipament_id' })
    equipament: Equipament;

    @Column()
    technician_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'technician_id' })
    technician: string;

    @CreateDateColumn()
    created_at: Date;

    @Column()
    jobs: string;

    @Column()
    isCorrective: boolean;
}

export default Preventive;
