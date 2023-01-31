import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import HttpException from '../utils/HttpException';
import httpStatusCode from '../utils/httpsStatusCode';
import { IUser } from '../interfaces/IUser';

const secret = process.env.JWT_SECRET || 'jwt_secret';

const createToken = (user: IUser) => {
  const payload = { id: user.id, email: user.email, role: user.role };
  return jwt.sign(payload, secret, { expiresIn: '1d', algorithm: 'HS256' });
};

const validaToken = (req: Request, _res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new HttpException(httpStatusCode.tokenNotFound, 'Token must be a valid token');
  }

  let payload;
  try {
    payload = jwt.verify(authorization, secret);
    req.body.use = payload;
    next();
  } catch (err) {
    console.log(err);
    throw new HttpException(httpStatusCode.tokenNotFound, 'Token must be a valid token');
  }
};

export default {
  createToken,
  validaToken,
};
