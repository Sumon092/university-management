export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
  needChangePassword: boolean | undefined;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
