import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

//dto
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  year: number;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist
}
