/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    ManyToOne,
    OneToMany,
} from 'typeorm';
import Category from './Category';
import Image from './Images';
import User from './User';

@Entity('equipaments')
class Equipament {
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
    monitor: boolean;

    @Column()
    critical: boolean;

    @Column()
    levelToManage: number;

    @Column()
    dateStartedMonitoring: Date;

    @Column()
    dateOfExpiration: Date;

    @Column()
    dateLastStopMonitor: Date;

    @Column()
    timesStopped: number;

    @Column()
    technician_id: string;

    @Column()
    category_id: string;

    @OneToMany(() => Image, image => image.images, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'equipament_id' })
    images: Image[];

    /// relação de 1 equipamento poder ter 1 técnico

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'technician_id' })
    technician: string;

    @ManyToOne(() => Category, { eager: true })
    @JoinColumn({ name: 'category_id' })
    category: string;

    expired: boolean;

    daysExpired: boolean;
}

export default Equipament;
