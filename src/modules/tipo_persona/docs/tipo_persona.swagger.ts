import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiBadGatewayResponse, ApiBadRequestResponse, ApiExtraModels, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateTipoPersonaDTO, UpdateTipoPersonaDTO } from '../dto/tipo_persona.dto';
import { applyDecorators } from '@nestjs/common';

export const CreateTipoPersonaSwagger = () => applyDecorators(
  ApiOperation({
    summary: 'Registra tipo de persona.'
  }),
  ApiBody({ type: CreateTipoPersonaDTO }),
  ApiCreatedResponse({
    description: 'Procesamiento exitoso',
    schema: {
      example: {
        message: '{Objeto} creado exitosamente',
        statusCode: 200,
        success: true,
      },
    },
  }),
  ApiBadRequestResponse({
    description: 'Error de procesamiento',
    schema: {
      example: {
        message: 'Error de procesamiento',
        statusCode: 400,
        success: false,
        errors: ['Detalles del error aquí'],
      },
    },
  }),
  ApiNotFoundResponse({
    description: 'Objeto no encontrado',
    schema: {
      example: {
        message: '{Objeto} no encontrado',
        statusCode: 404,
        success: false
      },
    },
  })
);

export const FindAllTipoPersonaSwagger = () => applyDecorators(
  ApiOperation({
    summary: 'Obtiene todo los tipo de personas, si no se proporcionan parámetros, límite a 10 por defecto.'
  }),
  ApiQuery({
    name: 'page',
    description: 'numero de pagina',
    required: false
  }),
  ApiQuery({
    name: 'limit',
    description: 'numero de registros por pagina',
    required: false
  }),
  ApiQuery({
    name: 'descripcion',
    description: 'tipo persona descripcion',
    required: false
  }),
  ApiOkResponse({
    description: 'Lista de tipo de personas',
    status: 200
  }),
  ApiBadGatewayResponse({
    description: 'Bad Gateway',
    status: 502
  }),
  ApiBadRequestResponse({
    description: 'Bad Request',
    status: 400
  }),
  ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    status: 500
  })
);

export const FindByIdTipoPersonaSwagger = () => applyDecorators(
  ApiOperation({
    summary: 'Consigue un tipo de persona con todos las personas que provienen de él.'
  }),
  ApiParam({
    name: 'id',
    description: 'Tipo de persona ID',
    required: true,
    type: Number
  }),
  ApiOkResponse({
    description: 'Obtiene el tipo de persona',
    status: 200
  }),
  ApiBadRequestResponse({
    description: 'Bad Request',
    status: 400
  }),
  ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    status: 500
  })
);

export const UpdatePersonaSwagger = () => applyDecorators(
  ApiOperation({
    summary: 'Actualiza el tipo de persona.'
  }),
  ApiBody({ type: UpdateTipoPersonaDTO }),
  ApiParam({
    name: 'id',
    description: 'Tipo de persona ID',
    required: true,
    type: Number
  }),
  ApiOkResponse({
    description: 'Procesamiento exitoso',
    schema: {
      example: {
        message: '{Objeto} actualizado exitosamente',
        statusCode: 200,
        success: true,
      },
    },
  }),
  ApiBadRequestResponse({
    description: 'Error de procesamiento',
    schema: {
      example: {
        message: 'Error de procesamiento',
        statusCode: 400,
        success: false,
        errors: ['Detalles del error aquí'],
      },
    },
  }),
  ApiNotFoundResponse({
    description: 'Objeto no encontrado',
    schema: {
      example: {
        message: '{Objeto} no encontrado',
        statusCode: 404,
        success: false
      },
    },
  })
);

export const DeleteTipoPersonaSwagger = () => applyDecorators(
  ApiOperation({
    summary: 'Elimina el tipo de persona.'
  }),
  ApiParam({
    name: 'id',
    description: 'Tipo de persona ID',
    required: true,
    type: Number
  }),
  ApiOkResponse({
    description: 'Procesamiento exitoso',
    schema: {
      example: {
        message: '{Objeto} eliminado exitosamente',
        statusCode: 200,
        success: true,
      },
    },
  }),
  ApiBadRequestResponse({
    description: 'Error de procesamiento',
    schema: {
      example: {
        message: 'Error de procesamiento',
        statusCode: 400,
        success: false,
        errors: ['Detalles del error aquí'],
      },
    },
  }),
  ApiNotFoundResponse({
    description: 'Objeto no encontrado',
    schema: {
      example: {
        message: '{Objeto} no encontrado',
        statusCode: 404,
        success: false
      },
    },
  })
);
