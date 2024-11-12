export interface HttpExceptionResponse {
	statusCode?: number;
	message: string | Array<String>;
	error?: string;
}