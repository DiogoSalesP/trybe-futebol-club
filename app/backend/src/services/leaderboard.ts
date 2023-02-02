import ModelTeam from '../database/models/team.model';
import ModelMatch from '../database/models/match.model';
import { ITeam } from '../interfaces/ITeam';
import Calculation from '../utils/calculationMatches';
import { IMach } from '../interfaces/IMach';

const overallRAting = async (team: ITeam) => {
  const matches = await ModelMatch.findAll(
    { where: { inProgress: false, homeTeamId: Number(team.id) } },
  );
  console.log(matches);
  const classification = Calculation.updatedRating(matches as unknown as IMach[]);

  const position = {
    name: team.teamName,
    totalPoints: classification.totalPoints,
    totalGames: matches.length,
    totalVictories: classification.totalVictories,
    totalDraws: classification.totalDraws,
    totalLosses: classification.totalLosses,
    goalsFavor: classification.goalsFavor,
    goalsOwn: classification.goalsOwn,
    goalsBalance: (classification.goalsFavor - classification.goalsOwn),
    efficiency: ((classification.totalPoints / (matches.length * 3)) * 100).toFixed(2),
  };
  return position;
};

const homeLeaderBoard = async () => {
  const teams = await ModelTeam.findAll();
  return Promise.all(teams.map((team) => {
    const teamRank = overallRAting(team);
    return teamRank;
  }));
};

const classificationLeaderBoard = async () => {
  const classification = await homeLeaderBoard();
  classification.sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);
  return classification;
};

export default {
  classificationLeaderBoard,
};
