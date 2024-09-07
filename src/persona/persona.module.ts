import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Persona } from './entities/persona.entity';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';
import { TipoPersonaModule } from 'src/tipo_persona/tipo_persona.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Persona]),
    TipoPersonaModule,
  ],
  controllers: [PersonaController],
  providers: [PersonaService],
})
export class PersonaModule { }
