import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { Gender } from 'src/constants/gender';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonaDTO {
  @ApiProperty()
  @IsString()
  nombres: string;

  @ApiProperty()
  @IsString()
  apellidos: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  genero: Gender;

  @ApiProperty()
  @IsString()
  tipo_persona: string;
}

//Agregar todos los campos opcionales
export class UpdatePersonaDTO extends PartialType(CreatePersonaDTO) {

  @ApiProperty()
  @IsString()
  nombres: string;

  @ApiProperty()
  @IsString()
  apellidos: string;

  @ApiProperty({ enum: Gender })
  @IsEnum(Gender)
  genero: Gender;

  @ApiProperty()
  @IsString()
  tipo_persona: string;

}
