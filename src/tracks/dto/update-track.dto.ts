import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

//dto
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsNotEmpty()
  name: string;

  @IsString()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null; // refers to Artist

  @IsString()
  @ValidateIf((object, value) => value !== null)
  albumId: string | null; // refers to Album

  @IsNumber()
  @IsNotEmpty()
  duration: number; // integer number
}
