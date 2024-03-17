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
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Artist } from './entities/artist.entity';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto ?? {};

    return this.artistsService.create(new CreateArtistDto(name, grammy));
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = await this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = (await this.findOne(id)) as Artist | undefined;

    const updatedArtist = this.artistsService.update(artist, updateArtistDto);

    if (!updatedArtist) {
      throw new ForbiddenException();
    }

    return updatedArtist;
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = (await this.findOne(id)) as Artist | undefined;

    if (!artist) {
      throw new NotFoundException();
    }

    return this.artistsService.remove(artist);
  }
}
