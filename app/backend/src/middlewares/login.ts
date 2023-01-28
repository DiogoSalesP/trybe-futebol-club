import { NextFunction, Request, Response } from 'express';
import httpStatusCode from '../utils/httpsStatusCode';

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(httpStatusCode.badRequest)
      .json({ message: 'All fields must be filled' });
  }

  next();
};

export default {
  login,
};
