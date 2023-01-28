import { NextFunction, Request, Response } from 'express';
import httpStatusCode from '../utils/httpsStatusCode';

const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(httpStatusCode.notFound)
      .json({ message: '"email"/"password" is required' });
  }

  next();
};

export default {
  login,
};
