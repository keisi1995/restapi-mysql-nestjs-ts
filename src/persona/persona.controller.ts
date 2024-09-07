import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { PersonaService } from './persona.service';
import { CreatePersonaDTO, UpdatePersonaDTO } from './dto/persona.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { Gender } from 'src/constants/gender';
import { CreatePersonaSwagger, UpdatePersonaSwagger, FindAllPersonaSwagger, FindByIdPersonaSwagger, DeletePersonaSwagger } from './docs/persona.swagger';

@ApiTags('Persona')
@ApiExtraModels(CreatePersonaDTO)
@ApiBearerAuth('JWT-auth')

@UseGuards(AuthGuard)
@Controller('persona')
export class PersonaController {

  constructor(private readonly personaService: PersonaService) { }

  @CreatePersonaSwagger()
  @Post()
  create(@Body() createPersonaDto: CreatePersonaDTO) {
    return this.personaService.create(createPersonaDto);
  }

  @FindAllPersonaSwagger()
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('nombres') nombres: string, @Query('genero') genero: Gender) {
    limit = limit > 100 ? 100 : limit;

    if (nombres || genero) {
      return this.personaService.filter(nombres, genero);
    }

    return this.personaService.paginate({
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      route: `${process.env.API_URL}/persona`,
    });
  }

  @FindByIdPersonaSwagger()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.personaService.findOne(id);
  }

  @UpdatePersonaSwagger()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePersonaDto: UpdatePersonaDTO) {
    return this.personaService.update(id, updatePersonaDto);
  }

  @DeletePersonaSwagger()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.personaService.remove(id);
  }
}
