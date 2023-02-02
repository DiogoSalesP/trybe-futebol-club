import { Request, Response } from 'express';
import httpStatusCode from '../utils/httpsStatusCode';
import Service from '../services/leaderboard';

const classificationGeral = async (_req: Request, res: Response) => {
  const result = await Service.classificationLeaderBoard();
  res.status(httpStatusCode.ok).json(result);
};

export default {
  classificationGeral,
};
