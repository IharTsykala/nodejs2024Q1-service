import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Put,
  NotFoundException,
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { validate as uuidValidate } from 'uuid';

@Controller('track')
export class TracksController {
  constructor(
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  findOneArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('not uuid', HttpStatus.BAD_REQUEST);
    }

    return this.artistsService.findOne(id);
  }

  findOneAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('not uuid', HttpStatus.BAD_REQUEST);
    }

    return this.albumsService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createTrackDto: CreateTrackDto) {
    const {
      name,
      artistId = null,
      albumId = null,
      duration,
    } = createTrackDto ?? {};

    if (artistId !== null) {
      const artist = this.findOneArtist(artistId);

      if (!artist) {
        throw new NotFoundException();
      }
    }

    if (albumId !== null) {
      const album = this.findOneAlbum(albumId);

      if (!album) {
        throw new NotFoundException();
      }
    }

    return this.tracksService.create(
      new CreateTrackDto(name, artistId, albumId, duration),
    );
  }

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.tracksService.findOne(id);

    if (!track) {
      throw new NotFoundException();
    }

    return track;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    const track = (await this.findOne(id)) as Track | undefined;

    const { artistId = null, albumId = null } = updateTrackDto ?? {};

    if (artistId !== null) {
      const artist = this.findOneArtist(artistId);

      if (!artist) {
        throw new NotFoundException();
      }
    }

    if (albumId !== null) {
      const album = this.findOneAlbum(albumId);

      if (!album) {
        throw new NotFoundException();
      }
    }

    const updatedTrack = this.tracksService.update(track, updateTrackDto);

    if (!updatedTrack) {
      throw new ForbiddenException();
    }

    return updatedTrack;
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = (await this.findOne(id)) as Track | undefined;

    if (!track) {
      throw new NotFoundException();
    }

    return this.tracksService.remove(id);
  }
}
