import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auphConfig from '@config/auth';
import AppError from '@shared/errors/AppRrror';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function verificandoAltenticacao(
  request: Request,
  respose: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    throw new AppError('TWT token is missing', 401);
  }
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, auphConfig.jwt.secret);
    const { sub } = decoded as ITokenPayload;
    console.log(request);
    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('Ivalid JWT token', 401);
  }
}
