import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, UpdateResult, DeleteResult } from 'typeorm';
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

  async filter(nombre: string, correo: string): Promise<Usuario[]> {
    return this.usuarioRepository.find({
      where: {
        nombre: nombre && Like(`%${nombre}%`),
        correo
      }
    });
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Usuario>> {
    return paginate<Usuario>(this.usuarioRepository, options);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id }
    });

    if (!usuario) { throw new BadRequestException('Usuario no encontrada'); }

    return usuario;
  }

  async findOneByEmail(correo: string): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { correo },
    });

    if (!usuario) { throw new BadRequestException('Usuario no encontrada'); }

    return usuario;
  }

  async create(createUsuarioDto: CreateUsuarioDTO): Promise<Usuario> {
    const usuario: Usuario = await this.usuarioRepository.findOneBy({
      correo: createUsuarioDto.correo,
    });

    if (usuario) { throw new BadRequestException('El usuario ya se encuentra registrado'); }

    const usuarioCreate: Usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      clave: bcrypt.hashSync(createUsuarioDto.clave, 10),
    });

    return this.usuarioRepository.save(usuarioCreate);
  }

  async update(id: number, updateUsuario: UpdateUsuarioDTO): Promise<UpdateResult> {
    const usuario: Usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) { throw new BadRequestException('Usuario no encontrada'); }

    const usuarioUpdate = {
      ...updateUsuario
    };

    return this.usuarioRepository.update(id, usuarioUpdate);
  }

  async remove(id: number): Promise<DeleteResult> {
    const usuario: Usuario = await this.usuarioRepository.findOneBy({ id });

    if (!usuario) { throw new BadRequestException('Usuario no encontrada'); }
    return this.usuarioRepository.softDelete(id);
  }
}
