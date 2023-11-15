import { $Enums, Prisma } from '@prisma/client';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsString()
  @IsOptional()
  @MaxLength(255)
  countryCode?: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsBoolean()
  @IsOptional()
  @MaxLength(255)
  enabled?: boolean;

  @IsOptional()
  @IsEnum($Enums.Gender)
  gender?: $Enums.Gender;

  @IsString()
  @MaxLength(255)
  name: string;

  @IsString()
  @MaxLength(255)
  password: string;

  @IsOptional()
  @IsEnum($Enums.NotificationEmail)
  notificationEmail?: $Enums.NotificationEmail;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  prefersLanguage?: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  profilePictureUrl?: string;

  @IsEnum($Enums.UserRole)
  @IsOptional()
  role?: $Enums.UserRole;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  timezone?: string;

  @IsEnum($Enums.PrefersColorScheme)
  prefersColorScheme?: $Enums.PrefersColorScheme;
}
