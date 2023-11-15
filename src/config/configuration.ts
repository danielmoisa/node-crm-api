import { ConfigFactory } from '@nestjs/config/dist/interfaces';
import { Configuration } from './configuration.interface';

const int = (val: string | undefined, num: number): number =>
  val ? (isNaN(parseInt(val)) ? num : parseInt(val)) : num;
const bool = (val: string | undefined, bool: boolean): boolean =>
  val == null ? bool : val == 'true';

const configuration: Configuration = {
  frontendUrl: process.env.FRONTEND_URL ?? 'http://localhost:3000',

  appName: process.env.APP_NAME ?? 'NestApi',

  security: {
    saltRounds: int(process.env.SALT_ROUNDS, 10),
    jwtSecret: process.env.JWT_SECRET ?? '',
  },
  email: {
    name: process.env.EMAIL_NAME ?? 'NestApi',
    from: process.env.EMAIL_FROM ?? '',
    retries: int(process.env.EMAIL_FAIL_RETRIES, 3),
    ses: {
      accessKeyId: process.env.EMAIL_SES_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.EMAIL_SES_SECRET_ACCESS_KEY ?? '',
      region: process.env.EMAIL_SES_REGION ?? '',
    },
    transport: {
      host: process.env.EMAIL_HOST ?? '',
      port: int(process.env.EMAIL_PORT, 587),
      secure: bool(process.env.EMAIL_SECURE, false),
      auth: {
        user: process.env.EMAIL_USER ?? process.env.EMAIL_FROM ?? '',
        pass: process.env.EMAIL_PASSWORD ?? '',
      },
    },
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? '',
    apiKey: process.env.CLOUDINARY_API_KEY ?? '',
    apiSecret: process.env.CLOUDINARY_API_SECRET ?? '',
  },
  gravatar: {
    enabled: bool(process.env.PASSWORD_PWNED_CHECK, true),
  },
};

const configFunction: ConfigFactory<Configuration> = () => configuration;
export default configFunction;
