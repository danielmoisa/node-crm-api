export interface Configuration {
  frontendUrl: string;

  meta: {
    appName: string;
    domainVerificationFile: string;
  };

  caching: {
    geolocationLruSize: number;
    apiKeyLruSize: number;
  };

  rateLimit: {
    public: { points: number; duration: number };
    authenticated: { points: number; duration: number };
    apiKey: { points: number; duration: number };
  };

  security: {
    saltRounds: number;
    jwtSecret: string;
    totpWindowPast: number;
    totpWindowFuture: number;
    mfaTokenExpiry: string;
    mergeUsersTokenExpiry: string;
    accessTokenExpiry: string;
    passwordPwnedCheck: boolean;
    unusedRefreshTokenExpiryDays: number;
    inactiveUserDeleteDays: number;
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
