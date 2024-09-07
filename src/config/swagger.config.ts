import { DocumentBuilder } from '@nestjs/swagger';

export const config = new DocumentBuilder()
  .setTitle('CondomiPro API Rest')
  .setDescription('Documentación oficial de condomipro.progalery.com:81')
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
