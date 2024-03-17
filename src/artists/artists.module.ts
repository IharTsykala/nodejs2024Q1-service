import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//services
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';

//entities
import { Artist } from '@app/artists/entities/artist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artist])],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
