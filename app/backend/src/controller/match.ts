import { NextFunction, Request, Response } from 'express';
import httpStatusCode from '../utils/httpsStatusCode';
import Service from '../services/match';

const getListOfMatches = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Service.getListOfMatches();
    res.status(httpStatusCode.ok).json(result);
  } catch (err) {
    next(err);
  }
};

export default {
  getListOfMatches,
};
