import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly storage: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const createdUser = await this.storage.create(createUserDto);

    return this.storage.save(createdUser);
  }

  async findAll() {
    console.log('await this.storage.find()', await this.storage.find());
    return await this.storage.find();
  }

  async findOne(id: string) {
    return await this.storage.findOne({
      where: { id },
    });
  }

  async update(user: User, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    if (oldPassword !== user.password) {
      return;
    }

    user.version++;
    user.updatedAt = Math.floor(Date.now() / 1000);

    const updatedUser = this.storage.create({
      ...user,
      password: newPassword,
    });

    return await this.storage.save(updatedUser);
  }

  async remove(user: User) {
    return await this.storage.delete(user);
  }
}
