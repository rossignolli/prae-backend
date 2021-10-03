/* eslint-disable prettier/prettier */
import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany,
    JoinColumn,
} from 'typeorm';
import Preventive from './Preventives';
import Equipament from './Equipament';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    level: number;

    @Column()
    isActive: boolean;

    @Column()
    verification: string;

    @Column()
    avatar: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    // relação de UM usuário poder ter VÁRIOS EQUIPAMENTOS

    @OneToMany(() => Equipament, Equipament => Equipament.technician, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'equipaments_id' })
    equipaments: Equipament[];

    // relação de UM usuário poder ter VÁRIAS PREVENTIVAS

    @OneToMany(() => Preventive, Preventive => Preventive.technician, {
        cascade: ['insert', 'update'],
    })
    @JoinColumn({ name: 'preventive_id' })
    preventives: Preventive[];
}

export default User;
