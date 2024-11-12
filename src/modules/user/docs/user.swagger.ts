import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiBadGatewayResponse, ApiBadRequestResponse, ApiExtraModels, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UpdateUserDTO } from '../dto/update-user.dto'
import { applyDecorators } from '@nestjs/common';

const entityName = 'usuario';

export const CreateUserSwagger = () => applyDecorators(
	ApiOperation({
		summary: `Registro de ${entityName}`,
	}),
	ApiBody({ type: CreateUserDTO }),
	ApiCreatedResponse({
		description: 'Created',
		status: 201
	}),
	ApiBadRequestResponse({
		description: 'Bad Request',
		status: 400
	}),
	ApiInternalServerErrorResponse({
		description: 'Internal Server Error',
		status: 500
	}),
	ApiBadGatewayResponse({
		description: 'Bad Gateway',
		status: 502
	}),
);

export const FindAllUserSwagger = () => applyDecorators(
	ApiOperation({
		summary: `Obtiene todos los ${entityName}, si no se proporcionan parámetros, límite a 10 por defecto.`,
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
		name: 'email',
		description: 'correo electronico',
		required: false
	}),
	ApiOkResponse({
		description: 'Ok',
		status: 200
	}),
	ApiBadRequestResponse({
		description: 'Bad Request',
		status: 400
	}),
	ApiNotFoundResponse({
		description: 'Not Found',
		status: 404
	}),
	ApiInternalServerErrorResponse({
		description: 'Internal Server Error',
		status: 500
	}),
	ApiBadGatewayResponse({
		description: 'Bad Gateway',
		status: 502
	}),
);

export const FindByIdUserSwagger = () => applyDecorators(
	ApiOperation({
		summary: `Buscar ${entityName} por ID`,
	}),
	ApiParam({
		name: 'id',
		description: `${entityName} ID`,
		required: true,
		type: Number
	}),
	ApiOkResponse({
		description: 'Ok',
		status: 200
	}),
	ApiBadRequestResponse({
		description: 'Bad Request',
		status: 400
	}),
	ApiNotFoundResponse({
		description: 'Not Found',
		status: 404
	}),
	ApiInternalServerErrorResponse({
		description: 'Internal Server Error',
		status: 500
	}),
	ApiBadGatewayResponse({
		description: 'Bad Gateway',
		status: 502
	}),
);

export const UpdateUserSwagger = () => applyDecorators(
	ApiOperation({
		summary: `Actualizar ${entityName} por ID`
	}),
	ApiBody({ type: UpdateUserDTO }),
	ApiParam({
		name: 'id',
		description: `${entityName} ID`,
		required: true,
		type: Number
	}),
	ApiOkResponse({
		description: 'Ok',
		status: 200
	}),
	ApiBadRequestResponse({
		description: 'Bad Request',
		status: 400
	}),
	ApiNotFoundResponse({
		description: 'Not Found',
		status: 404
	}),
	ApiInternalServerErrorResponse({
		description: 'Internal Server Error',
		status: 500
	}),
	ApiBadGatewayResponse({
		description: 'Bad Gateway',
		status: 502
	}),
);

export const DeleteUserSwagger = () => applyDecorators(
	ApiOperation({
		summary: `Eliminar ${entityName} por ID`
	}),
	ApiParam({
		name: 'id',
		description: `${entityName} ID`,
		required: true,
		type: Number
	}),
	ApiOkResponse({
		description: 'Ok',
		status: 200
	}),
	ApiBadRequestResponse({
		description: 'Bad Request',
		status: 400
	}),
	ApiNotFoundResponse({
		description: 'Not Found',
		status: 404
	}),
	ApiInternalServerErrorResponse({
		description: 'Internal Server Error',
		status: 500
	}),
	ApiBadGatewayResponse({
		description: 'Bad Gateway',
		status: 502
	}),
);
