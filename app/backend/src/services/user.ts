import { compareSync } from 'bcryptjs';
import { IUser } from '../interfaces/IUser';
import Model from '../database/models/user.model';
import jwt from '../helper/auth';
import HttpException from '../utils/HttpException';
import httpStatusCode from '../utils/httpsStatusCode';

const getUser = async (user: IUser) => {
  const { email, password } = user;
  const data = await Model.findOne({ where: { email } });
  if (!data) throw new HttpException(httpStatusCode.notFound, 'email not registered');
  if (!compareSync(password as string, data.password)) {
    throw new HttpException(httpStatusCode.notFound, 'password not found');
  }
  return jwt.createToken(data);
};

export default {
  getUser,
};
