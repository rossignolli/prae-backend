/* eslint-disable prettier/prettier */
import { uuid } from 'uuidv4';
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToMany,
} from 'typeorm';

import Image from './Images';

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
    expired: boolean;

    @OneToMany(() => Image, image => image.images, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'equipament_id' })
    images: Image[];
}

export default Equipament;
