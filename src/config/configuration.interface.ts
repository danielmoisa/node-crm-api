export interface Configuration {
  frontendUrl: string;

  appName: string;

  security: {
    saltRounds: number;
    jwtSecret: string;
  };

  email: {
    name: string;
    from: string;
    retries: number;
    ses?: {
      accessKeyId: string;
      secretAccessKey: string;
      region: string;
    };
    transport?: {
      host: string;
      port: number;
      secure: boolean;
      auth: {
        user: string;
        pass: string;
      };
    };
  };

  cloudinary: {
    cloudName: string;
    apiKey: string;
    apiSecret: string;
  };

  gravatar: {
    enabled: boolean;
  };
}
