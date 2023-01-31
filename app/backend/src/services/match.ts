import ModelTeam from '../database/models/team.model';
import ModelMatch from '../database/models/match.model';

const getListOfMatches = async () => {
  const result = await ModelMatch.findAll({
    include: [
      { model: ModelTeam, as: 'homeTeam' },
      { model: ModelTeam, as: 'awayTeam' },
    ],
  });
  return result;
};

const strToBool = (str: string) => {
  if (str === 'true') return true;
  if (str === 'false') return false;
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

export default {
  getListOfMatches,
  getInProgress,
};
