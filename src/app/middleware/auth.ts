import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiErrors';
import httpStatus from 'http-status';
import { jwtHelper } from '../../helper/jwtHelper';
import { Secret } from 'jsonwebtoken';
import config from '../../config';

const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get authorization token
      const token = req.headers.authorization;
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
      }

      // verify token
      const verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt.secret as Secret
      );
      if (!verifiedUser) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Invalid token');
      }
      //   Check if the user's role matches any of the required roles
      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'Insufficient permissions');
      }

      req.user = verifiedUser;

      next();
    } catch (error) {
      next(error);
    }
  };
export default auth;
