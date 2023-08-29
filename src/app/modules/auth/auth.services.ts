import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/user.model';
import {
  IChangePassword,
  ILoginResponse,
  ILoginUser,
  IRefreshTokenResponse,
} from './auth.interface';
import { JwtPayload, Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helper/jwtHelper';
import bcrypt from 'bcrypt';

const loginUser = async (payLoad: ILoginUser): Promise<ILoginResponse> => {
  const { id, password } = payLoad;
  const user = new User();

  const isUserExist = await user.isUserExist(id);
  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist');
  }
  if (isUserExist && isUserExist.password) {
    const passwordsMatch = await user.isPasswordMatched(
      password,
      isUserExist.password
    );
    if (!passwordsMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
    }
  }

  const { id: userId, role, needChangePassword } = isUserExist;

  const accessToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.jwt_expires as string
  );

  const refreshToken = jwtHelper.createToken(
    { userId, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires as string
  );

  //   const refreshToken = jwt.sign(
  //     {
  //       id: isUserExist.id,
  //       role: isUserExist.role,
  //     },
  //     config.jwt.refresh_secret as Secret,
  //     {
  //       expiresIn: config.jwt.refresh_expires,
  //     }
  //   );

  return {
    refreshToken,
    accessToken,
    needChangePassword,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  const user = new User();
  // verify token
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token');
  }

  // checking deleted user
  const { userId } = verifiedToken;
  const isUserExist = await user.isUserExist(userId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist');
  }
  // generate new token
  const newAccessToken = jwtHelper.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.jwt_expires as string
  );
  return {
    accessToken: newAccessToken,
  };
};

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const userData = new User();
  const { oldPassword, newPassword } = payload;
  const isUserExist = await userData.isUserExist(user?.userId);
  if (!isUserExist) {
    throw new ApiError(404, 'User does not exist');
  }
  if (isUserExist && isUserExist.password) {
    const passwordsMatch = await userData.isPasswordMatched(
      oldPassword,
      isUserExist.password
    );
    if (!passwordsMatch) {
      throw new ApiError(httpStatus.UNAUTHORIZED, 'Password does not match');
    }
  }
  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  );

  const updatedData = {
    password: newHashedPassword,
    needChangePassword: false,
    passwordChangeAt: new Date(),
  };
  //update password
  await User.findOneAndUpdate({ id: user?.userId }, updatedData);
};

export const AuthServices = {
  loginUser,
  refreshToken,
  changePassword,
};
