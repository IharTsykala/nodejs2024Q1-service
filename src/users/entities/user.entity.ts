import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsUUID } from 'class-validator';

@Entity({ name: 'Users' })
export class User {
  @IsUUID()
  @PrimaryGeneratedColumn('uuid')
  id: string; // uuid v4

  @Column({ nullable: false })
  login: string;

  @Exclude()
  @Column({ nullable: false })
  password: string;

  @Column({ default: 1 })
  version: number; // integer number, increments on update

  @Column({ default: Math.floor(Date.now() / 10000) })
  createdAt: number;

  @Column({ default: Math.floor(Date.now() / 10000) })
  updatedAt: number;

  constructor(fields: Partial<User>) {
    Object.assign(this, fields);
  }
}
