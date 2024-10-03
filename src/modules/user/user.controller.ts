import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { CreateUserSwagger, UpdateUserSwagger, FindAllUserSwagger, FindByIdUserSwagger, DeleteUserSwagger } from './docs/user.swagger';

@ApiTags('Usuario')
@ApiExtraModels(CreateUserDTO)
@ApiBearerAuth('JWT-auth')

@Controller('usuario')
export class UserController {

	constructor(private readonly userService: UserService) { }

	@CreateUserSwagger()
	@Post()
	create(@Body() createPersonaDto: CreateUserDTO) {
		return this.userService.create(createPersonaDto);
	}

	@UseGuards(AuthGuard)
	@FindAllUserSwagger()
	@Get()
	findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('nombre') nombre: string, @Query('correo') correo: string) {
		limit = limit > 100 ? 100 : limit;

		if (nombre || correo) {
			return this.userService.filter(nombre, correo);
		}

		return this.userService.paginate({
			limit: Number(limit) || 10,
			page: Number(page) || 1,
			route: `${process.env.API_URL}/usuario`,
		});
	}

	@UseGuards(AuthGuard)
	@FindByIdUserSwagger()
	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.userService.findOne(id);
	}

	@UseGuards(AuthGuard)
	@UpdateUserSwagger()
	@Patch(':id')
	update(@Param('id') id: number, @Body() updatePersonaDto: UpdateUserDTO) {
		return this.userService.update(id, updatePersonaDto);
	}

	@UseGuards(AuthGuard)
	@DeleteUserSwagger()
	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.userService.remove(id);
	}
}
