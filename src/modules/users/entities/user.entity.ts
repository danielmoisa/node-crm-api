import { $Enums, Prisma } from '@prisma/client';

export class User implements Prisma.UserCreateInput {
  name!: string;
  password!: string;
  email!: string;
  countryCode?: string;
  enabled?: boolean;
  gender?: $Enums.Gender;
  notificationEmail?: $Enums.NotificationEmail;
  prefersLanguage?: string;
  profilePictureUrl?: string;
  role?: $Enums.UserRole;
  timezone?: string;
  prefersColorScheme?: $Enums.PrefersColorScheme;
}
