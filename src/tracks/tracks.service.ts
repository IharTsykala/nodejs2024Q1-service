import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private readonly storage: Repository<Track>,
  ) {}

  create(createTrackDto: CreateTrackDto) {
    const createdTrack = this.storage.create(createTrackDto);

    return this.storage.save(createdTrack);
  }

  findAll() {
    return this.storage.find();
  }

  async findOne(id: string) {
    const result = await this.storage.findOne({
      where: { id },
    });

    return result;
  }

  update(track: Track, updateTrackDto: UpdateTrackDto) {
    const createdTrack = this.storage.create({
      ...track,
      ...updateTrackDto,
    });

    return this.storage.save(createdTrack);
  }

  async remove(id: string) {
    return await this.storage.delete({ id });
  }
}
