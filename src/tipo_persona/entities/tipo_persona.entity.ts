import { Entity, PrimaryGeneratedColumn, Column, OneToMany, DeleteDateColumn } from 'typeorm';
import { Persona } from '../../persona/entities/persona.entity';
import { ITipoPersona } from 'src/interfaces/tipo_persona.interface';

@Entity('tipo_persona')
export class TipoPersona implements ITipoPersona {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 20, unique: true })
  descripcion: string;

  @OneToMany(() => Persona, (persona) => persona.tipo_persona)
  personas: Persona[];

  @DeleteDateColumn()
  deletedAt: Date;
}
