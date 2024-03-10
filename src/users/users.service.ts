import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import Database from '../bd';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly storage: Database) {}

  create(createUserDto: CreateUserDto) {
    return this.storage.create('users', createUserDto);
  }

  findAll() {
    return this.storage.findAll('users');
  }

  findOne(id: string) {
    return this.storage.findOne('users', id);
  }

  update(user: User, updatePasswordDto: UpdatePasswordDto) {
    if (updatePasswordDto.oldPassword !== user.password) {
      return;
    }

    const { oldPassword, newPassword } = updatePasswordDto;

    return this.storage.update(
      user,
      new UpdatePasswordDto(oldPassword, newPassword),
    );
  }

  remove(id: string) {
    return this.storage.remove('users', id);
  }
}
