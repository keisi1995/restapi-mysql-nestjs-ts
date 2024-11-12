import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { getMessageHttp } from '../../utils/utils';
import { HttpExceptionResponse } from '../../interfaces/http-exception.interface';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
		const exceptionResponse = exception.getResponse() as HttpExceptionResponse | string;

		let errorMessage = 'An error occurred';
		let errorDetails = null;

		if (typeof exceptionResponse === 'object') {
			if (Array.isArray(exceptionResponse.message)) {
				errorMessage = 'Validation failed';
				errorDetails = exceptionResponse.message;
			} else if (typeof exceptionResponse.message === 'string') {
				errorMessage = exceptionResponse.message || errorMessage;
			}
		} else if (typeof exceptionResponse === 'string') {
			errorMessage = exceptionResponse;
		}

		if (errorMessage === 'An error occurred') errorMessage = getMessageHttp(status);

		response.status(status).json({
			statusCode: status,
			success: false,
			message: errorMessage,
			error: {
				details: errorDetails,
			},
			timestamp: new Date().toISOString(),
			path: request.url,
		});
	}
}