import { Injectable } from '@nestjs/common';

//bd
import Database from '../bd';

//entities
import { Track } from './entities/track.entity';

//dto
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(private storage: Database) {}

  create(createTrackDto: CreateTrackDto) {
    return this.storage.create('tracks', createTrackDto);
  }

  findAll() {
    return this.storage.findAll('tracks');
  }

  findOne(id: string) {
    return this.storage.findOne('tracks', id);
  }

  update(track: Track, updateTrackDto: UpdateTrackDto) {
    return this.storage.update(track, updateTrackDto);
  }

  remove(id: string) {
    return this.storage.remove('tracks', id);
  }
}
