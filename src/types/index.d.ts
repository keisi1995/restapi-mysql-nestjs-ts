declare namespace NodeJS {
	interface ProcessEnv {
		API_PORT: number,
		API_URL: string,
		API_ENV: string,
		API_VERSION: string,
		API_PREFIX: string,
		API_NAME: string,
		MYSQL_HOST: string,
		MYSQL_PORT: number,
		MYSQL_USER: string,
		MYSQL_PASSWORD: string,
		MYSQL_DATABASE: string,
		DB_SYNC: string,
		JWT_SECRET: string,
	}
}
