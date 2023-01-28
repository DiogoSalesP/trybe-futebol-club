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
  const token = jwt.createToken(data);
  return { token, data };
};

const getUserByRole = async (user: IUser) => {
  const { email } = user;
  const data = await Model.findOne({ where: { email } });
  if (!data) throw new HttpException(httpStatusCode.notFound, 'User not found ');
  return data;
};

export default {
  getUser,
  getUserByRole,
};
