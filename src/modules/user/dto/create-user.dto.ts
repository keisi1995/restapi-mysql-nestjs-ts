import { IsString, MinLength, IsEmail, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(5)
	@MaxLength(20)
	first_name: string;

	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(5)
	@MaxLength(20)
	last_name: string;

	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsEmail()
	@MinLength(10)
	@MaxLength(30)
	email: string;

	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(6)
	@MaxLength(20)
	password: string;

	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(2)
	@MaxLength(20)
	profile: string;
}
