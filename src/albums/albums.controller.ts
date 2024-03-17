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
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { ArtistsService } from '../artists/artists.service';
import { validate as uuidValidate } from 'uuid';

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
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.albumsService.findOne(id);

    if (!album) {
      throw new NotFoundException();
    }

    return album;
  }

  @Put(':id')
  async update(
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

    const album = (await this.findOne(id)) as Album | undefined;

    const updatedAlbum = await this.albumsService.update(album, updateAlbumDto);

    if (!updatedAlbum) {
      throw new ForbiddenException();
    }

    return updatedAlbum;
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = (await this.findOne(id)) as Album | undefined;

    if (!album) {
      throw new NotFoundException();
    }

    return this.albumsService.remove(id);
  }
}
