import { $Enums, Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  @IsOptional()
  countryCode?: string;

  @IsEmail()
  email: string;

  @IsBoolean()
  @IsOptional()
  enabled?: boolean;

  @IsOptional()
  @IsEnum($Enums.Gender)
  gender?: $Enums.Gender;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum($Enums.NotificationEmail)
  notificationEmail?: $Enums.NotificationEmail;

  @IsString()
  @IsOptional()
  prefersLanguage?: string;

  @IsString()
  @IsOptional()
  profilePictureUrl?: string;

  @IsEnum($Enums.UserRole)
  @IsOptional()
  role?: $Enums.UserRole;

  @IsString()
  @IsOptional()
  timezone?: string;

  @IsEnum($Enums.PrefersColorScheme)
  prefersColorScheme?: $Enums.PrefersColorScheme;
}
