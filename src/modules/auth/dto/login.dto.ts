import { IsEmail, IsString, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
	@ApiProperty()
	@IsEmail()
	email: string;

	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(8)
	password: string;
}
