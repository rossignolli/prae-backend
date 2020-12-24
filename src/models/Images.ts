import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import Equipament from './Equipament';

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    path: string;

    @ManyToOne(() => Equipament, equipament => equipament.images)
    @JoinColumn({ name: 'equipament_id' })
    images: Equipament;
}
