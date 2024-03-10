import { Module } from '@nestjs/common';

//services
import { UsersService } from './users.service';

//controller
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
