import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [ArtistsModule],
  exports: [AlbumsService],
})
export class AlbumsModule {}
