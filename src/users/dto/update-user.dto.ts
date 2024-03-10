import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdatePasswordDto extends PartialType(CreateUserDto) {
  @IsString()
  @IsNotEmpty()
  readonly oldPassword: string; // previous password

  @IsString()
  @IsNotEmpty()
  readonly newPassword: string; // new password

  constructor(oldPassword, newPassword) {
    super();
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }
}
