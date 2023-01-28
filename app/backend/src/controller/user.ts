import { NextFunction, Request, Response } from 'express';
import httpStatusCode from '../utils/httpsStatusCode';
import Service from '../services/user';

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await Service.getUser(req.body);
    res.status(httpStatusCode.ok).json({ token });
  } catch (err) {
    next(err);
  }
};

export default {
  getUser,
};
