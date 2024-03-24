import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private readonly storage: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const createdAlbum = await this.storage.create(createAlbumDto);

    return await this.storage.save(createdAlbum);
  }

  async findAll() {
    return await this.storage.find();
  }

  async findOne(id: string) {
    return await this.storage.findOne({
      where: { id },
    });
  }

  async update(album: Album, updateAlbumDto: UpdateAlbumDto) {
    const createdAlbum = await this.storage.create({
      ...album,
      ...updateAlbumDto,
    });

    return await this.storage.save(createdAlbum);
  }

  async remove(id: string) {
    return await this.storage.delete({ id });
  }
}
