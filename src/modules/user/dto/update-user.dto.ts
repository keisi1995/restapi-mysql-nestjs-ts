import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDTO } from './create-user.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDTO extends PartialType(CreateUserDTO) {
    @ApiPropertyOptional()
    nombre: string;

    @ApiPropertyOptional()
    correo: string;

    @ApiPropertyOptional()
    clave: string;
}