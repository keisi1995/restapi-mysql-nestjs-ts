import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTipoPersonaDTO {
  @ApiProperty()
  @IsString()
  descripcion: string;
}

//Agregar todos los campos opcionales
export class UpdateTipoPersonaDTO extends PartialType(CreateTipoPersonaDTO) {
  @ApiProperty()
  @IsString()
  descripcion: string;
}
