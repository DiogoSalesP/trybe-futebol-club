import { ITeam } from '../interfaces/ITeam';
import Model from '../database/models/team.model';
import HttpException from '../utils/HttpException';
import httpStatusCode from '../utils/httpsStatusCode';

const getAll = async (): Promise<ITeam[]> => {
  const data = await Model.findAll();
  return data;
};

const getById = async (id: number): Promise<ITeam> => {
  const data = await Model.findByPk(id);
  if (!data) throw new HttpException(httpStatusCode.notFound, 'Team not found ');
  return data;
};

export default {
  getAll,
  getById,
};
