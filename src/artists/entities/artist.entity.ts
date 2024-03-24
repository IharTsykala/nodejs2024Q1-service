import { IsUUID } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Album } from '../../albums/entities/album.entity';
import { Track } from '../../tracks/entities/track.entity';
import { Exclude } from 'class-transformer';

@Entity('Artist')
export class Artist {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ nullable: false })
  name: string;

  @Column({ default: false })
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist)
  @Exclude()
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist)
  @Exclude()
  tracks: Track[];
}
