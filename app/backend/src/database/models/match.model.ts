import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';

import Teams from './team.model';

class Matches extends Model {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

Matches.init({
  id: {
    type: INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  homeTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Matches.belongsTo(Teams, { foreignKey: 'homeTeamId', as: 'homeTeam' });
Matches.belongsTo(Teams, { foreignKey: 'awayTeamId', as: 'awayTeam' });

Teams.hasMany(Matches, { foreignKey: 'homeTeamId', as: 'homeMatches' });
Teams.hasMany(Matches, { foreignKey: 'awayTeamId', as: 'awayMatches' });

export default Matches;
