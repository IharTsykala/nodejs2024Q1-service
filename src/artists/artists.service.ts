import { Injectable } from '@nestjs/common';

//entities
import { Artist } from './entities/artist.entity';

//dto
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

//db
import Database from '../bd';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/users/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(User)
    private readonly storage: Repository<User>,
  ) {}

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
