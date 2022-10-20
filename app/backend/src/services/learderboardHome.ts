import { Op } from 'sequelize';
import sequelize = require('sequelize');
import Matche from '../database/models/matchesModel';
import Team from '../database/models/teamsModel';
import { IResponseService, ITeam } from '../interfaces';
import LeaderboardService from './learderboard';

export default class LeaderboardHomeService extends LeaderboardService {
  public matchModel = Matche;
  public teamModel = Team;

  public async getLeaderboard(): Promise<IResponseService> {
    const teamsHome = await this.getTeams();

    const scoreboard = await Promise.all(teamsHome.map(async ({ id, teamName }) => ({
      name: teamName,
      totalPoints: await this.getTotalPoints(id),
      totalGames: await this.getTotalGames(id),
      totalVictories: await this.getWins(id),
      totalDraws: await this.getDraws(id),
      totalLosses: await this.getLosses(id),
      goalsFavor: await this.getGoalsFavor(id),
      goalsOwn: await this.getGoalsOwn(id),
      goalsBalance: await this.getGoalsBalance(id),
      efficiency: await this.getEfficiency(id),
    })));

    return { status: 200, response: this.orderScoreboard(scoreboard) };
  }

  public async getTeams(): Promise<ITeam[]> {
    const teamsHome = await this.teamModel.findAll({
      where: {
        id: {
          [Op.in]: sequelize.literal(`(
            SELECT home_team 
            FROM TRYBE_FUTEBOL_CLUBE.matches
            INNER JOIN TRYBE_FUTEBOL_CLUBE.teams
            ON home_team = teams.id
            WHERE home_team = teams.id
          )`),
        },
      },
    });

    console.log(teamsHome);

    return teamsHome;
  }

  public async getWins(id: number): Promise<number> {
    const countWins = await this.matchModel.findAll({
      where: {
        [Op.and]: [
          { homeTeam: id, inProgress: false },
          sequelize.where(sequelize.col('home_team_goals'), '>', sequelize.col('away_team_goals')),
        ],
      },
    });

    return countWins.length;
  }

  public async getDraws(id: number): Promise<number> {
    const countDraws = await this.matchModel.count({
      where: {
        [Op.and]: [
          { homeTeam: id },
          sequelize.where(sequelize.col('home_team_goals'), sequelize.col('away_team_goals')),
          { inProgress: false },
        ],
      },
    });

    return countDraws;
  }

  public async getLosses(id: number): Promise<number> {
    const countLosses = await this.matchModel.findAll({
      where: {
        [Op.and]: [
          { homeTeam: id, inProgress: false },
          sequelize.where(sequelize.col('home_team_goals'), '<', sequelize.col('away_team_goals')),
        ],
      },
    });

    return countLosses.length;
  }

  public async getGoalsFavor(id: number): Promise<number> {
    const goalsFavor = await this.matchModel.sum('homeTeamGoals', {
      where: { homeTeam: id, inProgress: false },
    });

    return goalsFavor;
  }

  public async getGoalsOwn(id: number): Promise<number> {
    const goalsOwn = await this.matchModel.sum('awayTeamGoals', {
      where: { homeTeam: id, inProgress: false },
    });

    return goalsOwn;
  }

  public async getTotalGames(id: number): Promise<number> {
    const totalGames = await this.matchModel.count({
      where: { homeTeam: id, inProgress: false },
    });

    return totalGames;
  }
}
