import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';

//entities
import { Album } from '@app/albums/entities/album.entity';
import { Track } from '@app/tracks/entities/track.entity';
import { Artist } from '@app/artists/entities/artist.entity';
import { User } from '@app/users/entities/user.entity';
import { Favorite } from '@app/favorites/entities/favorite.entity';

export const typeOrmAsyncConfig: TypeOrmModuleOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => ({
    type: config.get('TYPE_BD') as string,
    host: config.get('POSTGRES_HOST') as string,
    username: config.get('POSTGRES_USER') as string,
    password: config.get('POSTGRES_PASSWORD') as string,
    database: config.get('POSTGRES_DB') as string,
    port: config.get('POSTGRES_PORT') as number,
    entities: [__dirname + 'dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    autoLoadEntities: true,
    logging: true,
    migrationsRun: true,
    migrationsTableName: 'migration',
    migrations: [
      __dirname + '/migrations/**/*.ts',
      __dirname + '/migrations/**/*.js',
    ],
    cli: {
      migrationsDir: 'src/migrations',
    },
  }),
} as TypeOrmModuleOptions;

const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.POSTGRES_DB,
  synchronize: false,
  entities: [Album, Track, Artist, User, Favorite],
  migrations: [__dirname + './src/migrations/*.ts'],
  migrationsRun: true,
};

export const dataSource: DataSource = new DataSource(typeOrmConfig);
