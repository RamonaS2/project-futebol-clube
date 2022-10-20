import Team from '../database/models/teamsModel';
import ITeams from '../interfaces/ ITeams';

class TeamSevice {
  public team = Team;

  public async getAll(): Promise<object> {
    const teams = await this.team.findAll();
    return teams;
  }

  public async getById(id: number): Promise<object> {
    const teamId = await this.team.findOne({
      where: { id },
      attributes: { exclude: ['password'] },
      raw: true,
    });

    return teamId as ITeams;
  }
}

export default TeamSevice;
