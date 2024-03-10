import { Module } from '@nestjs/common';

//services
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
