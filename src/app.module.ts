import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//modules
import { DBModule } from './bd/bd.module';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';

//controller
import { AppController } from './app.controller';

//service
import { AppService } from './app.service';

//configs
import { environmentConfig } from '@app/config';

@Module({
  imports: [
    ConfigModule.forRoot(environmentConfig),
    UsersModule,
    ArtistsModule,
    TracksModule,
    AlbumsModule,
    FavoritesModule,
    DBModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
