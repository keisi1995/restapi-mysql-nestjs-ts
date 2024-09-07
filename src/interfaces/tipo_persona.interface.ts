import { Persona } from 'src/persona/entities/persona.entity';

export interface ITipoPersona {
  id: number;
  descripcion: string;
  personas: Persona[];
  deletedAt: Date;
}
