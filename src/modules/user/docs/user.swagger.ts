import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiBadGatewayResponse, ApiBadRequestResponse, ApiExtraModels, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto'
import { applyDecorators } from '@nestjs/common';
import { Gender } from '../../../constants/gender';

export const CreateUserSwagger = () => applyDecorators(
	ApiOperation({
		summary: 'Registro de usuario.'
	}),
	ApiBody({ type: CreateUserDTO }),
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

export const FindAllUserSwagger = () => applyDecorators(
	ApiOperation({
		summary: 'Obtiene todas los usuarios, si no se proporcionan parámetros, límite a 10 por defecto.'
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
		name: 'nombre',
		description: 'nombre del usuario',
		required: false
	}),
	ApiQuery({
		name: 'correo',
		description: 'correo del usuario',
		required: false,
	}),
	ApiOkResponse({
		description: 'Lista de usuarios',
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

export const FindByIdUserSwagger = () => applyDecorators(
	ApiOperation({
		summary: 'Consigue un usuario.'
	}),
	ApiParam({
		name: 'id',
		description: 'Usuario ID',
		required: true,
		type: Number
	}),
	ApiOkResponse({
		description: 'Obtiene el usuario',
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

export const UpdateUserSwagger = () => applyDecorators(
	ApiOperation({
		summary: 'Actualiza el usuario.'
	}),
	ApiBody({ type: UpdateUserDTO }),
	ApiParam({
		name: 'id',
		description: 'Usuario ID',
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

export const DeleteUserSwagger = () => applyDecorators(
	ApiOperation({
		summary: 'Eliminar Modelo.'
	}),
	ApiParam({
		name: 'id',
		description: 'Usuario ID',
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
