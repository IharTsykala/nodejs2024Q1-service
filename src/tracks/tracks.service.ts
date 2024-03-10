import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import Database from '../bd';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';

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
