import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const typeOrmConfig = {
  type: 'postgres',
  port: Number(process.env.POSTGRES_PORT) ?? 5432,
  host: process.env.POSTGRES_HOST ?? 'localhost',
  username: process.env.POSTGRES_USER ?? 'postgres',
  password: process.env.POSTGRES_PASSWORD ?? 'postgres',
  database: 'postgres',
  entities: ['../**/*.entity.ts', '../**/*.entity.js'],
  migrationsRun: false,
  migrationsTableName: 'migration',
  migrations: ['migrations/**/*.ts', 'migrations/**/*.js'],
  synchronize: false,
  logging: true,
} satisfies DataSourceOptions;

export const appDataSource = new DataSource(typeOrmConfig);

export const typeOrmAsyncConfig: TypeOrmModuleOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    ...typeOrmConfig,
    host: configService.get<string>('POSTGRES_HOST') ?? 'localhost',
    port: Number(configService.get<string>('POSTGRES_PORT')) ?? 5432,
    username: configService.get<string>('DATABASE_USER') ?? 'postgres',
    database: configService.get<string>('POSTGRES_DB') ?? 'postgres',
    password: configService.get<string>('DATABASE_PASSWORD') ?? 'postgres',
  }),
} as TypeOrmModuleOptions;

appDataSource
  .initialize()
  .then(() => {
    console.log('Data Source was initialized');
  })
  .catch((err) => {
    console.error('Error Data Source initialization', err);
  });
