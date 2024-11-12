import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from 'src/modules/user/user.service';
import { LoginDto } from './dto/login.dto';
import { first } from 'rxjs';

@Injectable()
export class AuthService {

	constructor(
		private readonly userService: UserService,
		private readonly jwt: JwtService,
	) { }

	async login({ email, password }: LoginDto) {
		const usuario = await this.userService.findOneByEmail(email);

		if (!usuario) { throw new UnauthorizedException('Correo incorrecto'); }

		if (!bcrypt.compareSync(password, usuario.password)) { throw new UnauthorizedException('Clave incorrecta'); }

		const payload = { sub: usuario.id, name: usuario.first_name };

		return {
			acces_token: await this.jwt.signAsync(payload),
			first_name: usuario.first_name,
			last_name: usuario.last_name
		};
	}
}
