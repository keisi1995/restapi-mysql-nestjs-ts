import { Entity, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';
import { IPersona } from 'src/modules/persona/interfaces/persona.interface';
import { TipoPersona } from 'src/modules/tipo_persona/entities/tipo_persona.entity';
import { Gender } from 'src/constants/gender';

@Entity('persona')
export class Persona implements IPersona {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  nombres: string;

  @Column({ type: 'varchar', length: 30 })
  apellidos: string;

  @Column({ type: 'enum', enum: Gender })
  genero: Gender;

  @ManyToOne(() => TipoPersona, (tipo_persona) => tipo_persona.id)
  @JoinColumn({ name: 'id_tipo_persona' })
  tipo_persona: TipoPersona;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
