import { INTEGER, BOOLEAN, Model } from 'sequelize';
import Team from './teamsModel';
import database from '.';

class Matche extends Model {
  id!: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

Matche.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true,

  },
  homeTeam: INTEGER,
  homeTeamGoals: INTEGER,
  awayTeam: INTEGER,
  awayTeamGoals: INTEGER,
  inProgress: BOOLEAN,
}, {
  underscored: true,
  sequelize: database,
  modelName: 'matches',
  timestamps: false,
});

Matche.belongsTo(Team, { foreignKey: 'home_team', as: 'teamHome' });
Matche.belongsTo(Team, { foreignKey: 'away_team', as: 'teamAway' });

export default Matche;
