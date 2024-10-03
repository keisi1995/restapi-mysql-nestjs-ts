import { IsString, MinLength, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(3)
	nombre: string;

	@ApiProperty()
	@IsEmail()
	correo: string;

	@ApiProperty()
	@Transform(({ value }) => value.trim())
	@IsString()
	@MinLength(8)
	clave: string;
}
