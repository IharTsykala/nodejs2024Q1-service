import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private readonly storage: Repository<Artist>,
  ) {}

  async create(createArtistDto: CreateArtistDto) {
    const createdArtist = this.storage.create(createArtistDto);

    return this.storage.save(createdArtist);
  }

  findAll() {
    return this.storage.find();
  }

  async findOne(id: string) {
    return await this.storage.findOne({
      where: { id },
    });
  }

  async update(artist: Artist, updateArtistDto: UpdateArtistDto) {
    const createdArtist = await this.storage.create({
      ...artist,
      ...updateArtistDto,
    });

    return await this.storage.save(createdArtist);
  }

  async remove(artist: Artist) {
    return await this.storage.delete(artist);
  }
}
