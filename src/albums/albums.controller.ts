import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  Put,
  ForbiddenException,
  HttpCode,
  HttpException,
  HttpStatus,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { validate as uuidValidate } from 'uuid';

//services
import { AlbumsService } from './albums.service';
import { ArtistsService } from '../artists/artists.service';

//entities
import { Album } from './entities/album.entity';

//dto
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistService: ArtistsService,
  ) {}

  findOneAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('not uuid', HttpStatus.BAD_REQUEST);
    }

    return this.artistService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createAlbumDto: CreateAlbumDto) {
    const { name, year, artistId = null } = createAlbumDto ?? {};

    if (artistId !== null) {
      const artist = this.findOneAlbum(artistId);

      if (!artist) {
        throw new NotFoundException();
      }
    }

    return this.albumsService.create(new CreateAlbumDto(name, year, artistId));
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    const { artistId = null } = updateAlbumDto ?? {};

    if (artistId !== null) {
      const artist = this.findOneAlbum(artistId);

      if (!artist) {
        throw new NotFoundException();
      }
    }

    const album = this.findOne(id) as Album | undefined;

    const updatedAlbum = this.albumsService.update(album, updateAlbumDto);

    if (!updatedAlbum) {
      throw new ForbiddenException();
    }

    return updatedAlbum;
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const isRemoved = this.albumsService.remove(id);

    if (!isRemoved) {
      throw new NotFoundException();
    }

    return this.albumsService.remove(id);
  }
}
