import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import { Artist } from '../../artists/entities/artist.entity';
import { Exclude } from 'class-transformer';
import { Track } from '../../tracks/entities/track.entity';

@Entity({ name: 'Album' })
export class Album {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  year: number;

  @IsOptional()
  @IsString()
  @Column({ nullable: true })
  artistId: string | null; // refers to Artist

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @Exclude()
  artist: Artist;

  @OneToMany(() => Track, (track) => track.album, { cascade: true })
  @Exclude()
  tracks: Track[];
}
