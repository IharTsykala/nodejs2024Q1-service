import { Module } from '@nestjs/common';

//modules
import { ArtistsModule } from '../artists/artists.module';

//controllers
import { AlbumsController } from './albums.controller';

//services
import { AlbumsService } from './albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService],
  imports: [ArtistsModule],
  exports: [AlbumsService],
})
export class AlbumsModule {}
