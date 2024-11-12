import { HttpStatus } from '@nestjs/common';

export const getMessageHttp = (status: number): string => {
	let userFriendlyMessage = '';
	switch (status) {
		case HttpStatus.BAD_REQUEST:
			userFriendlyMessage = 'Invalid input, please check your request';
			break;
		case HttpStatus.UNAUTHORIZED:
			userFriendlyMessage = 'Unauthorized, please check your credentials';
			break;
		case HttpStatus.NOT_FOUND:
			userFriendlyMessage = 'Resource not found';
			break;
		case HttpStatus.INTERNAL_SERVER_ERROR:
			userFriendlyMessage = 'Internal server error, please try again later';
			break;
		default:
			userFriendlyMessage = 'An unexpected error occurred';
			break;
	}

	return userFriendlyMessage;
}