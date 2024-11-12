import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { ProfileService } from './profile.service';
import { CreateProfileDTO } from './dto/create-profile.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { AuthGuard } from 'src/modules/auth/guard/auth.guard';
import { CreateProfileSwagger, UpdateProfileSwagger, FindAllProfileSwagger, FindByIdProfileSwagger, DeleteProfileSwagger } from './docs/profile.swagger';

@ApiTags('Perfil')
@ApiExtraModels(CreateProfileDTO)
@ApiBearerAuth('JWT-auth')

@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {

	constructor(private readonly profileService: ProfileService) { }

	@CreateProfileSwagger()
	@Post()
	create(@Body() createProfileDto: CreateProfileDTO) {
		return this.profileService.create(createProfileDto);
	}

	@FindAllProfileSwagger()
	@Get()
	findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('name') name: string) {
		limit = limit > 100 ? 100 : limit;

		if (name) {
			return this.profileService.filter(name);
		}

		return this.profileService.findAll();
		// return this.profileService.paginate({
		// 	limit: Number(limit) || 10,
		// 	page: Number(page) || 1,
		// 	route: `${process.env.API_URL}/profile`,
		// });
	}

	@FindByIdProfileSwagger()
	@Get(':id')
	findOne(@Param('id') id: number) {
		return this.profileService.findOne(id);
	}

	@UpdateProfileSwagger()
	@Patch(':id')
	update(@Param('id') id: number, @Body() updateProfileDto: UpdateProfileDTO) {
		return this.profileService.update(id, updateProfileDto);
	}

	@DeleteProfileSwagger()
	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.profileService.remove(id);
	}
}
