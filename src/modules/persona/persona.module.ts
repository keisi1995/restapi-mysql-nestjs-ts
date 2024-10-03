import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Persona } from './entities/persona.entity';
import { PersonaController } from './persona.controller';
import { PersonaService } from './persona.service';
import { TipoPersonaModule } from 'src/modules/tipo_persona/tipo_persona.module';
import { AppModule } from '../../app.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Persona]),
    TipoPersonaModule,
    forwardRef(() => AppModule),
  ],
  controllers: [PersonaController],
  providers: [PersonaService],
})
export class PersonaModule { }
