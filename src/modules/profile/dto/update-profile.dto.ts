import { PartialType } from '@nestjs/mapped-types';
import { CreateProfileDTO } from './create-profile.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProfileDTO extends PartialType(CreateProfileDTO) {
	@ApiPropertyOptional()
	name: string;

	@ApiPropertyOptional()
	status: string;
}