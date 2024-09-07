import { IUsuario } from 'src/interfaces/usuario.interface';
import { CreateDateColumn, UpdateDateColumn, Column, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('usuario')
export class Usuario implements IUsuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 20 })
  nombre: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  correo: string;

  @Column({ type: 'varchar', length: 100 })
  @Exclude()
  clave: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  @Exclude()
  deletedAt: Date;

  constructor(partial: Partial<Usuario>) {
    Object.assign(this, partial);
  }

}
