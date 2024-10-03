import { UnauthorizedException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from 'src/modules/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
	constructor(
		private readonly userRepository: UserService,
		private readonly jwt: JwtService,
	) { }

	async login({ correo, clave }: LoginDto) {
		const usuario = await this.userRepository.findOneByEmail(correo);

		if (!usuario) { throw new UnauthorizedException('Correo incorrecto'); }

		if (!bcrypt.compareSync(clave, usuario.clave)) { throw new UnauthorizedException('Clave incorrecta'); }

		const payload = { sub: usuario.id, name: usuario.nombre };

		return {
			acces_token: await this.jwt.signAsync(payload),
			usuario: usuario.nombre
		};
	}
}
