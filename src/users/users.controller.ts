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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

//services
import { UsersService } from './users.service';

//entities
import { User } from './entities/user.entity';

//dto
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    const { login, password } = createUserDto ?? {};
    return this.usersService.create(new CreateUserDto(login, password));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [CreateUserDto] })
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({ summary: 'Get users by id' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @ApiOperation({ summary: 'Change user by id' })
  @ApiResponse({ status: 200, type: CreateUserDto })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdatePasswordDto,
  ) {
    const user = (await this.findOne(id)) as User | undefined;

    const updatedUser = await this.usersService.update(user, updateUserDto);

    if (!updatedUser) {
      throw new ForbiddenException();
    }

    return updatedUser;
  }

  @HttpCode(204)
  @Delete(':id')
  @ApiOperation({ summary: 'Remove user by id' })
  @ApiResponse({ status: 204 })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = (await this.findOne(id)) as User | undefined;

    return await this.usersService.remove(user);
  }
}
