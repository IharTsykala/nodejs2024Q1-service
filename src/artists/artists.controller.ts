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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

//entities
import { Artist } from './entities/artist.entity';

//dto
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

//services
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createArtistDto: CreateArtistDto) {
    const { name, grammy } = createArtistDto ?? {};

    return this.artistsService.create(new CreateArtistDto(name, grammy));
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const artist = this.artistsService.findOne(id);

    if (!artist) {
      throw new NotFoundException();
    }
    return artist;
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    const artist = this.findOne(id) as Artist | undefined;

    const updatedArtist = this.artistsService.update(artist, updateArtistDto);

    if (!updatedArtist) {
      throw new ForbiddenException();
    }

    return updatedArtist;
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const isRemoved = this.artistsService.remove(id);
    if (!isRemoved) {
      throw new NotFoundException();
    }
    return this.artistsService.remove(id);
  }
}
