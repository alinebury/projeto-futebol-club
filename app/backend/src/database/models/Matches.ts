import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

export default class Match extends Model {
  public id!: number;
  public homeTeam!: number;
  public homeTeamGoals!: number;
  public awayTeam!: number;
  public awayTeamGoals!: number;
  public inProgress!: boolean;
}

Match.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: INTEGER,
  },
  homeTeam: {
    type: INTEGER,
    field: 'home_team',
  },
  homeTeamGoals: {
    type: INTEGER,
    field: 'home_team_goals',
  },
  awayTeam: {
    type: INTEGER,
    field: 'away_team',
  },
  awayTeamGoals: {
    type: INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    type: BOOLEAN,
    field: 'in_progress',
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Team.belongsTo(Match, { foreignKey: 'id', as: 'teamHome' });
Team.belongsTo(Match, { foreignKey: 'id', as: 'teamAway' });

Match.hasMany(Team, { foreignKey: 'id', as: 'teamHome' });
Match.hasMany(Team, { foreignKey: 'id', as: 'teamAway' });
