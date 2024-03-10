import { Module } from '@nestjs/common';

//modules
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';

//service
import { TracksService } from './tracks.service';

//controller
import { TracksController } from './tracks.controller';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [ArtistsModule, AlbumsModule],
  exports: [TracksService],
})
export class TracksModule {}
