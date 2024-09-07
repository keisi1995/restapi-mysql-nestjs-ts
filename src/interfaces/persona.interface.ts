import { Gender } from 'src/constants/gender';
import { TipoPersona } from 'src/tipo_persona/entities/tipo_persona.entity';

export interface IPersona {
  id: number;
  nombres: string;
  apellidos: string;
  genero: Gender;
  tipo_persona: TipoPersona;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
