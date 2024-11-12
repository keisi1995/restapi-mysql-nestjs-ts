import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
	.setTitle(process.env.API_NAME)
	.setDescription('Documentación oficial')
	.setVersion('1.0')
	.addBearerAuth(
		{
			type: 'http',
			scheme: 'bearer',
			bearerFormat: 'JWT',
		},
		'JWT-auth', // Nombre de la referencia para la autenticación
	)
	.build();
