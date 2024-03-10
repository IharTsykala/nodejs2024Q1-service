import { Injectable } from '@nestjs/common';

//entities
import { Artist } from './entities/artist.entity';

//dto
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

//db
import Database from '../bd';

@Injectable()
export class ArtistsService {
  constructor(private storage: Database) {}

  create(createArtistDto: CreateArtistDto) {
    return this.storage.create('artists', createArtistDto);
  }

  findAll() {
    return this.storage.findAll('artists');
  }

  findOne(id: string) {
    return this.storage.findOne('artists', id);
  }

  update(artist: Artist, updateArtistDto: UpdateArtistDto) {
    return this.storage.update(artist, updateArtistDto);
  }

  remove(id: string) {
    return this.storage.remove('artists', id);
  }
}
