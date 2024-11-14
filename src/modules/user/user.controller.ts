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

@Controller('users')
export class UserController {

	constructor(private readonly userService: UserService) { }


	@Get('/get-port')
	getPort(): string {
		return this.userService.getPort();
	}

	@CreateUserSwagger()
	@Post()
	create(@Body() createPersonaDto: CreateUserDTO) {
		return this.userService.create(createPersonaDto);
	}

	@UseGuards(AuthGuard)
	@FindAllUserSwagger()
	@Get()
	findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('email') email: string) {
		limit = limit > 100 ? 100 : limit;

		if (email) {
			return this.userService.filter(email);
		}

		return this.userService.paginate({
			limit: Number(limit) || 10,
			page: Number(page) || 1,
			route: `${process.env.API_URL}/user`,
		});
	}

	@UseGuards(AuthGuard)
	@FindByIdUserSwagger()
	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.userService.findOne(id);
	}

	@UseGuards(AuthGuard)
	@FindByIdUserSwagger()
	@Get(':id/merchant')
	findOneMerchant(@Param('id') id: number) {
		return this.userService.findOneMerchant(id);
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
