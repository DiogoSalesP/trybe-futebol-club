import { ErrorRequestHandler } from 'express';
import HttpException from '../utils/HttpException';

const httpErrorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  console.log('err', err);
  const { status, message } = err as HttpException;
  return res.status(status).json({ message });
};

export default httpErrorMiddleware;
