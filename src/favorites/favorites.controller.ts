import {
  Controller,
  Post,
  Param,
  Delete,
  Get,
  ParseUUIDPipe,
  HttpStatus,
  HttpException,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { validate as uuidValidate } from 'uuid';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly tracksService: TracksService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
  ) {}

  async findOneArtist(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('not uuid', HttpStatus.BAD_REQUEST);
    }

    return await this.artistsService.findOne(id);
  }

  findOneAlbum(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('not uuid', HttpStatus.BAD_REQUEST);
    }

    return this.albumsService.findOne(id);
  }

  findOneTrack(id: string) {
    if (!uuidValidate(id)) {
      throw new HttpException('not uuid', HttpStatus.BAD_REQUEST);
    }

    return this.tracksService.findOne(id);
  }

  @Get()
  getAllFavorites() {
    return this.favoritesService.getAll();
  }

  @Get('/artist')
  getArtists() {
    return this.favoritesService.get('artists');
  }

  @Post('/artist/:id')
  async createArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.findOneArtist(id);

    if (!artist) {
      throw new HttpException('not same id', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return this.favoritesService.add('artists', id);
  }

  @HttpCode(204)
  @Delete('/artist/:id')
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.findOneArtist(id);

    if (!artist) {
      throw new NotFoundException();
    }

    return this.favoritesService.remove('artists', id);
  }

  @Get('/albums')
  getAlbums() {
    return this.favoritesService.get('albums');
  }

  @Post('/album/:id')
  async createAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = await this.findOneAlbum(id);

    if (!album) {
      throw new HttpException('not same id', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return this.favoritesService.add('albums', id);
  }

  @HttpCode(204)
  @Delete('/album/:id')
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const album = this.findOneAlbum(id);

    if (!album) {
      throw new NotFoundException();
    }

    return this.favoritesService.remove('albums', id);
  }

  @Get('/tracks')
  getTracks() {
    return this.favoritesService.get('tracks');
  }

  @Post('/track/:id')
  async createTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = await this.findOneTrack(id);

    if (!track) {
      throw new HttpException('not same id', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return this.favoritesService.add('tracks', id);
  }

  @HttpCode(204)
  @Delete('/track/:id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const track = this.findOneTrack(id);

    if (!track) {
      throw new NotFoundException();
    }

    return this.favoritesService.remove('tracks', id);
  }
}
