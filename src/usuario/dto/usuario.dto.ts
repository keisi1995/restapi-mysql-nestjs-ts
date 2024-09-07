import { PartialType } from '@nestjs/mapped-types';
import { IsString, MinLength, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUsuarioDTO {
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

//Agregar todos los campos opcionales
export class UpdateUsuarioDTO extends PartialType(CreateUsuarioDTO) {

}
