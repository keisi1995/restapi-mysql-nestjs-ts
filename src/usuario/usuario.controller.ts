import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { UsuarioService } from './usuario.service';
import { CreateUsuarioDTO, UpdateUsuarioDTO } from './dto/usuario.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { CreateUsuarioSwagger, UpdateUsuarioSwagger, FindAllUsuarioSwagger, FindByIdUsuarioSwagger, DeleteUsuarioSwagger } from './docs/usuario.swagger';

@ApiTags('Usuario')
@ApiExtraModels(CreateUsuarioDTO)
@ApiBearerAuth('JWT-auth')

@Controller('usuario')
export class UsuarioController {

  constructor(private readonly usuarioService: UsuarioService) { }

  @CreateUsuarioSwagger()
  @Post()
  create(@Body() createPersonaDto: CreateUsuarioDTO) {
    return this.usuarioService.create(createPersonaDto);
  }

  @UseGuards(AuthGuard)
  @FindAllUsuarioSwagger()
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('nombre') nombre: string, @Query('correo') correo: string) {
    limit = limit > 100 ? 100 : limit;

    if (nombre || correo) {
      return this.usuarioService.filter(nombre, correo);
    }

    return this.usuarioService.paginate({
      limit: Number(limit) || 10,
      page: Number(page) || 1,
      route: `${process.env.API_URL}/usuario`,
    });
  }

  @UseGuards(AuthGuard)
  @FindByIdUsuarioSwagger()
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usuarioService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @UpdateUsuarioSwagger()
  @Patch(':id')
  update(@Param('id') id: number, @Body() updatePersonaDto: UpdateUsuarioDTO) {
    return this.usuarioService.update(id, updatePersonaDto);
  }

  @UseGuards(AuthGuard)
  @DeleteUsuarioSwagger()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usuarioService.remove(id);
  }
}
