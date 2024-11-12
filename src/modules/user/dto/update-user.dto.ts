import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
	@ApiPropertyOptional()
	first_name: string;

	@ApiPropertyOptional()
	last_name: string;

	@ApiPropertyOptional()
	email: string;

	@ApiPropertyOptional()
	password: string;

	@ApiPropertyOptional()
	profile: string;
}