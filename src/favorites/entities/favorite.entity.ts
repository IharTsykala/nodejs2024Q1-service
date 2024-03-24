import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsUUID } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity('Favorite')
export class Favorite {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  @Exclude()
  id: number;

  @Column()
  entity: string;

  @Column()
  entityId: string;
}
