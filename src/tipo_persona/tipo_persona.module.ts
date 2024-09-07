import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TipoPersona } from './entities/tipo_persona.entity';
import { TipoPersonaController } from './tipo_persona.controller';
import { TipoPersonaService } from './tipo_persona.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoPersona]),
  ],
  exports: [
    TypeOrmModule
  ],
  controllers: [TipoPersonaController],
  providers: [TipoPersonaService],
})
export class TipoPersonaModule { }
