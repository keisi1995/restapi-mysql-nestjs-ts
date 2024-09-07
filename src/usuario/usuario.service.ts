import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';

import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDTO, UpdateUsuarioDTO } from './dto/usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) { }

  async paginate(options: IPaginationOptions): Promise<Pagination<Usuario>> {
    return paginate<Usuario>(this.usuarioRepository, options);
  }

  async filter(nombre: string, correo: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: {
        nombre: nombre && Like(`%${nombre}%`),
        correo
      }
    });
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });

    if (!usuario) { throw new BadRequestException('Usuario no encontrada'); }

    return usuario;
  }

  async findOneByEmail(correo: string) {
    const usuario = await this.usuarioRepository.findOne({
      where: { correo },
    });

    if (!usuario) { throw new BadRequestException('Usuario no encontrada'); }

    return usuario;
  }

  async create(createUsuarioDto: CreateUsuarioDTO) {
    const usuario: Usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      clave: bcrypt.hashSync(createUsuarioDto.clave, 10),
    });

    return await this.usuarioRepository.save(usuario);
  }

  async update(id: number, updatePersonaDto: UpdateUsuarioDTO) {
    const usuario: Usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) { throw new BadRequestException('Usuario no encontrada'); }

    const updatedUsuario = {
      ...updatePersonaDto
    };

    return await this.usuarioRepository.update(id, updatedUsuario);
  }

  async remove(id: number) {
    const usuario: Usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) { throw new BadRequestException('Usuario no encontrada'); }
    return this.usuarioRepository.softDelete(id);
  }
}
