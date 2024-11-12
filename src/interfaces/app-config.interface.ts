export interface AppConfig {
	port: number;
	environment: string;
	apiVersion: string;
	appName?: string;
	jwtSecret: string;
	apiPrefix: string;
}