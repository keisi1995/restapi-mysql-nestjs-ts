import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { TipoPersonaService } from './tipo_persona.service';
import { CreateTipoPersonaDTO, UpdateTipoPersonaDTO } from './dto/tipo_persona.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { CreateTipoPersonaSwagger, UpdatePersonaSwagger, FindAllTipoPersonaSwagger, FindByIdTipoPersonaSwagger, DeleteTipoPersonaSwagger } from './docs/tipo_persona.swagger';

@ApiTags('Tipo de persona')
@ApiExtraModels(CreateTipoPersonaDTO)
@ApiBearerAuth('JWT-auth')

@UseGuards(AuthGuard)
@Controller('tipo-persona')
export class TipoPersonaController {

  constructor(private readonly tipoPersonaService: TipoPersonaService) { }

  @CreateTipoPersonaSwagger()
  @Post()
  create(@Body() createPlanetDto: CreateTipoPersonaDTO) {
    return this.tipoPersonaService.create(createPlanetDto);
  }

  @FindAllTipoPersonaSwagger()
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('descripcion') descripcion: string) {
    limit = limit > 100 ? 100 : limit;

    if (descripcion) { return this.tipoPersonaService.filter(descripcion); }

    return this.tipoPersonaService.paginate({
      limit: Number(limit),
      page: Number(page),
      route: `${process.env.API_URL}/tipo-persona`,
    });
  }

  @FindByIdTipoPersonaSwagger()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.tipoPersonaService.findOne(id);
  }

  @UpdatePersonaSwagger()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePlanetDto: UpdateTipoPersonaDTO) {
    return this.tipoPersonaService.update(id, updatePlanetDto);
  }

  @DeleteTipoPersonaSwagger()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.tipoPersonaService.remove(id);
  }
}
