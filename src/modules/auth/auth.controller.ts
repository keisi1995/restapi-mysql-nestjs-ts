import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';

@ApiTags('Autenticacion')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) { }

	@Throttle({ default: { limit: 3, ttl: 60 } })
	@Post('login')
	login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}
}
