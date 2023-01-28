// import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
// import HttpException from '../utils/HttpException';
// import httpStatusCode from '../utils/httpsStatusCode';
import { IUser } from '../interfaces/IUser';

const secret = process.env.JWT_SECRET;

const createToken = (user: IUser) => {
  const payload = { id: user.id, email: user.email };
  return jwt.sign({ payload }, secret as string, { expiresIn: '45m', algorithm: 'HS256' });
};

// const auth = (req: Request, res: Response, next: NextFunction) => {
//   const { authorization: token } = req.headers;

//   if (!token) {
//     throw new HttpException(httpStatusCode.tokenNotFound, 'Token not found');
//   }

//   let payload;
//   try {
//     payload = jwt.verify(token as string, secret);
//     req.body.use = payload;
//     next();
//   } catch (err) {
//     console.log(err);
//     throw new HttpException(httpStatusCode.tokenNotFound, 'Error');
//   }
// };

export default {
  createToken,
  // auth,
};
