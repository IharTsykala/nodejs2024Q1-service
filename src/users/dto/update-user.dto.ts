import { PartialType } from '@nestjs/mapped-types';

import { IsNotEmpty, IsString } from 'class-validator';

//dto
import { CreateUserDto } from './create-user.dto';

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
