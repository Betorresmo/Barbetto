import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const { sub } = decodedToken as ITokenPayload;

    req.user = { id: sub };

    return next();
  } catch {
    throw new AppError('Invalid JWT.', 401);
  }
};

export default ensureAuthenticated;
