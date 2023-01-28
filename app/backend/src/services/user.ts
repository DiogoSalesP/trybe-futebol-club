import { compareSync } from 'bcryptjs';
import { IUser } from '../interfaces/IUser';
import Model from '../database/models/user.model';
import jwt from '../helper/auth';
import HttpException from '../utils/HttpException';
import httpStatusCode from '../utils/httpsStatusCode';

const getUser = async (user: IUser) => {
  const { email, password } = user;
  const data = await Model.findOne({ where: { email } });
  if (!data || !compareSync(password as string, data.password)) {
    throw new HttpException(httpStatusCode.tokenNotFound, 'Incorrect email or password');
  }
  return jwt.createToken(data);
};

export default {
  getUser,
};
