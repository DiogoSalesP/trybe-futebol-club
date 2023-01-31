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

const saveMatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Service.saveMatch(req.body);
    res.status(httpStatusCode.created).json(result);
  } catch (err) {
    next(err);
  }
};

const changeStatusInProgress = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const result = await Service.changeStatusInProgress(id);
  res.status(httpStatusCode.ok).json(result);
};

export default {
  getListOfMatches,
  saveMatch,
  changeStatusInProgress,
};
