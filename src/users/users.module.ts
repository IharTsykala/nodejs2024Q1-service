import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

//services
import { UsersService } from './users.service';

//controller
import { UsersController } from './users.controller';

//entities
import { User } from '@app/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
