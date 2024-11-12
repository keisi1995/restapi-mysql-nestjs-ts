import { IsString, MinLength, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProfileDTO {
	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(2)
	@MaxLength(20)
	name: string;

	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(5)
	@MaxLength(20)
	status: string;
}
