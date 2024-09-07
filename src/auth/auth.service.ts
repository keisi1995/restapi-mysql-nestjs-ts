import { UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UsuarioService } from 'src/usuario/usuario.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioRepository: UsuarioService,
    private readonly jwt: JwtService,
  ) { }

  async login({ correo, clave }: LoginDto) {
    const usuario = await this.usuarioRepository.findOneByEmail(correo);

    if (!usuario) { throw new UnauthorizedException('Correo incorrecto'); }

    if (!bcrypt.compareSync(clave, usuario.clave)) { throw new UnauthorizedException('Clave incorrecta'); }

    const payload = { sub: usuario.id, name: usuario.nombre };

    return {
      acces_token: await this.jwt.signAsync(payload),
      usuario: usuario.nombre
    };
  }
}
