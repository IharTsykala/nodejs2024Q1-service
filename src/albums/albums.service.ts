import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import Database from '../bd';

@Injectable()
export class AlbumsService {
  constructor(private storage: Database) {}

  create(createAlbumDto: CreateAlbumDto) {
    return this.storage.create('albums', createAlbumDto);
  }

  findAll() {
    return this.storage.findAll('albums');
  }

  findOne(id: string) {
    return this.storage.findOne('albums', id);
  }

  update(track: Album, updateTrackDto: UpdateAlbumDto) {
    return this.storage.update(track, updateTrackDto);
  }

  remove(id: string) {
    return this.storage.remove('albums', id);
  }
}
