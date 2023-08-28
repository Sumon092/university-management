import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiErrors';
import { User } from '../users/user.model';
import { ILoginResponse, ILoginUser } from './auth.interface';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelper } from '../../../helper/jwtHelper';

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

export const AuthServices = {
  loginUser,
};
