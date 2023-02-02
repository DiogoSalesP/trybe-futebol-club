import { IMach } from '../interfaces/IMach';

const updatedRating = (matches: IMach[]) => matches.reduce((acc, cur) => {
  if (cur.homeTeamGoals > cur.awayTeamGoals) {
    acc.totalPoints += 3;
    acc.totalVictories += 1;
  } if (cur.awayTeamGoals > cur.homeTeamGoals) {
    acc.totalLosses += 1;
  } if (cur.homeTeamGoals === cur.awayTeamGoals) {
    acc.totalPoints += 1;
    acc.totalDraws += 1;
  }
  acc.goalsFavor += cur.homeTeamGoals;
  acc.goalsOwn += cur.awayTeamGoals;
  return acc;
}, { totalPoints: 0,
  totalVictories: 0,
  totalDraws: 0,
  totalLosses: 0,
  goalsFavor: 0,
  goalsOwn: 0 });

export default {
  updatedRating,
};
