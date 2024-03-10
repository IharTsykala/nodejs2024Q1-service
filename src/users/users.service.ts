import { Injectable } from '@nestjs/common';

//entities
import { User } from './entities/user.entity';

//bd
import Database from '../bd';

//dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

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
