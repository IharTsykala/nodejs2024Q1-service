import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
  ParseUUIDPipe,
  NotFoundException,
  Put,
  ForbiddenException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const { login, password } = createUserDto ?? {};
    return this.usersService.create(new CreateUserDto(login, password));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return this.usersService.findOne(id);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    const user = this.findOne(id) as User | undefined;

    const updatedUser = this.usersService.update(user, updateUserDto);

    if (!updatedUser) {
      throw new ForbiddenException();
    }

    return updatedUser;
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const isRemoved = this.usersService.remove(id);
    if (!isRemoved) {
      throw new NotFoundException();
    }
    return this.usersService.remove(id);
  }
}
