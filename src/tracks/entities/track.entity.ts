import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IsUUID } from 'class-validator';
import { Album } from '../../albums/entities/album.entity';
import { Exclude } from 'class-transformer';
import { Artist } from '../../artists/entities/artist.entity';

@Entity('Track')
export class Track {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @Column({ nullable: true })
  albumId: string | null; // refers to Album

  @Column()
  duration: number; // integer number

  @ManyToOne(() => Album, (album) => album.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  album: Album;

  @ManyToOne(() => Artist, (artist) => artist.tracks, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  artist: Artist;
}
