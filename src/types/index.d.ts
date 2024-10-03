declare namespace NodeJS {
  interface ProcessEnv {
    APP_PORT: number,
    APP_URL: string,
    APP_ENV: string,
    APP_VERSION: string,
    APP_PREFIX: string,
    APP_NAME: string,
    MYSQL_HOST: string,
    MYSQL_PORT: number,
    MYSQL_USER: string,
    MYSQL_PASSWORD: string,
    MYSQL_DATABASE: string,
    DB_SYNC: string,
    JWT_SECRET: string,
    CLOUDINARY_CLOUD_NAME: string,
    CLOUDINARY_API_KEY: string,
    CLOUDINARY_API_SECRET: string,
  }
}
