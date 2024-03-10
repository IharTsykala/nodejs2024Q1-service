import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [ArtistsModule, AlbumsModule],
  exports: [TracksService],
})
export class TracksModule {}
