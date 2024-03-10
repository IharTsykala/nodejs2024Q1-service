import { PartialType } from '@nestjs/mapped-types';

//dto
import { CreateFavoriteDto } from './create-favorite.dto';

export class UpdateFavoriteDto extends PartialType(CreateFavoriteDto) {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}
