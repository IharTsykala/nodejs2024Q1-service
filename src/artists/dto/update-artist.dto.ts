import { PartialType } from '@nestjs/mapped-types';

import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

//dto
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends PartialType(CreateArtistDto) {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsBoolean()
  @IsNotEmpty()
  grammy: boolean;
}
