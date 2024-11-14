import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { getDataSourceConfig } from './database.config';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot();
const AppDataSource = new DataSource(getDataSourceConfig(new ConfigService()));

AppDataSource.initialize()
	.then(() => {
		console.log('Data Source has been initialized!');
	})
	.catch((err) => {
		console.error('Error during Data Source initialization', err);
		process.exit(1);
	});

export default AppDataSource;