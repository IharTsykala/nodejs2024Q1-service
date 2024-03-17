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
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

const schema = {
  id: '231132a3-b3aa-4e32-a3f2-94c344c605e1',
  login: 'ihar',
  vertion: 1,
  createdAt: 1675707209336,
  updatedA: 1675707209336,
};

const createSchema = {
  login: 'string',
  password: 'string',
};

const updateSchema = {
  oldPassword: 'string',
  newPassword: 'string',
};

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @ApiOperation({ summary: 'Create user', description: 'Create user' })
  @ApiBody({
    schema: {
      example: createSchema,
    },
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created',
    schema: {
      example: schema,
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request.',
  })
  create(@Body() createUserDto: CreateUserDto) {
    const { login, password } = createUserDto ?? {};
    return this.usersService.create(new CreateUserDto(login, password));
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  @ApiOperation({ summary: 'All users', description: 'All users' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success 200',
    schema: {
      example: [schema],
    },
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  @ApiOperation({
    summary: 'User by id',
    description: 'User by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success 200',
    schema: {
      example: schema,
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @ApiOperation({
    summary: 'Update password',
    description: 'Updates password by id',
  })
  @ApiBody({
    schema: {
      example: updateSchema,
    },
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Success 200',
    schema: {
      example: schema,
    },
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'oldPassword is wrong',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
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
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user',
  })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: '',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Not found',
  })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = (await this.findOne(id)) as User | undefined;

    return await this.usersService.remove(user);
  }
}
