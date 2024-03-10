import { Module } from '@nestjs/common';

//modules
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';

//service
import { FavoritesService } from './favorites.service';

//controller
import { FavoritesController } from './favorites.controller';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService],
  imports: [ArtistsModule, AlbumsModule, TracksModule],
})
export class FavoritesModule {}
