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

export default {
  getListOfMatches,
};
