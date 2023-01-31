import { NextFunction, Request, Response } from 'express';
import httpStatusCode from '../utils/httpsStatusCode';
import Service from '../services/match';

const getListOfMatches = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { inProgress } = req.query;
    const result = await Service.getInProgress(inProgress as string);
    res.status(httpStatusCode.ok).json(result);
  } catch (err) {
    next(err);
  }
};

export default {
  getListOfMatches,
};
