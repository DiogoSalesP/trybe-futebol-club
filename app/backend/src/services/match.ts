import ModelTeam from '../database/models/team.model';
import ModelMatch from '../database/models/match.model';
import { IMach } from '../interfaces/IMach';
import HttpException from '../utils/HttpException';
import httpStatusCode from '../utils/httpsStatusCode';

const strToBool = (str: string) => {
  if (str === 'true') return true;
  if (str === 'false') return false;
};

// const getTeam = async (homeTeamId: number, homeTeamId: number) => {
//   const result = await ModelTeam.findByPk(homeTeamId);
//   if (result === null) {
//     throw new HttpException(httpStatusCode.unprocessableEntity, 'There is no team with such id!');
//   }
// };

const getListOfMatches = async () => {
  const result = await ModelMatch.findAll({
    include: [
      { model: ModelTeam, as: 'homeTeam' },
      { model: ModelTeam, as: 'awayTeam' },
    ],
  });
  return result;
};

const getInProgress = async (query: string) => {
  if (query === undefined) return getListOfMatches();
  const inProgress = strToBool(query);
  const result = await ModelMatch.findAll({
    where: { inProgress },
    include: [
      { model: ModelTeam, as: 'homeTeam' },
      { model: ModelTeam, as: 'awayTeam' },
    ],
  });
  return result;
};

const saveMatch = async (match: IMach) => {
  const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;
  const resultHomeTeamId = await ModelTeam.findByPk(homeTeamId);
  const resultAwayTeamId = await ModelTeam.findByPk(awayTeamId);
  if (!resultHomeTeamId || !resultAwayTeamId) {
    throw new HttpException(httpStatusCode.notFound, 'There is no team with such id!');
  }
  if (homeTeamId === awayTeamId) {
    throw new HttpException(httpStatusCode
      .unprocessableEntity, 'It is not possible to create a match with two equal teams');
  }
  const data = await ModelMatch.create({
    homeTeamId,
    awayTeamId,
    homeTeamGoals,
    awayTeamGoals,
    inProgress: true,
  });
  return data;
};

const changeStatusInProgress = async (id: number) => {
  await ModelMatch.update({ inProgress: false }, {
    where: { id },
  });
  return { message: 'Finished' };
};

export default {
  getListOfMatches,
  getInProgress,
  saveMatch,
  changeStatusInProgress,
};
