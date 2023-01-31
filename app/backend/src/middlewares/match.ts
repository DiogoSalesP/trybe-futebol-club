import { NextFunction, Request, Response } from 'express';
import httpStatusCode from '../utils/httpsStatusCode';

const validateEqualMatch = (req: Request, res: Response, next: NextFunction) => {
  const { homeTeamId, awayTeamId } = req.body;
  if (homeTeamId === awayTeamId) {
    res
      .status(httpStatusCode.unprocessableEntity)
      .json({ message: 'It is not possible to create a match with two equal teams' });
    next();
  }
};

export default {
  validateEqualMatch,
};
