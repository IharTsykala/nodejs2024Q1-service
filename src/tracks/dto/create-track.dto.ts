import { IsNotEmpty, IsNumber, IsString, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
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

  constructor(name, artistId, albumId, duration) {
    this.name = name;
    this.artistId = artistId;
    this.albumId = albumId;
    this.duration = duration;
  }
}
