import { NextFunction, Request, Response } from 'express';
import httpStatusCode from '../utils/httpsStatusCode';
import Service from '../services/team';

const getAll = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Service.getAll();
    res.status(httpStatusCode.ok).json(data);
  } catch (err) {
    next(err);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = parseInt(req.params.id, 10);
    const data = await Service.getById(id);
    res.status(httpStatusCode.ok).json(data);
  } catch (err) {
    next(err);
  }
};

export default {
  getAll,
  getById,
};
