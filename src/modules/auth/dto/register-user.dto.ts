import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterUsersDto {
  @IsString()
  @Length(6, 20)
  password: string;

  @IsString()
  @Length(5, 20)
  name: string;

  @IsEmail()
  @Length(5, 20)
  email: string;
}
