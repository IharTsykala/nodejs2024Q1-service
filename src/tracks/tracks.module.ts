import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { ArtistsModule } from '../artists/artists.module';
import { AlbumsModule } from '../albums/albums.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './entities/track.entity';

@Module({
  controllers: [TracksController],
  providers: [TracksService],
  imports: [ArtistsModule, AlbumsModule, TypeOrmModule.forFeature([Track])],
  exports: [TracksService],
})
export class TracksModule {}
