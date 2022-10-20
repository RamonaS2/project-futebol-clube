import Matche from '../database/models/matchesModel';
import Team from '../database/models/teamsModel';
import HttpException from '../shared/HttpException';
import IMatches from '../interfaces/IMatches';

class MatcheService {
  public matche = Matche;

  public async getAll(): Promise<Matche[]> {
    const matches = await this.matche.findAll({
      include: [{
        model: Team,
        as: 'teamHome',
        attributes: { exclude: ['id'] },
      }, {
        model: Team,
        as: 'teamAway',
        attributes: { exclude: ['id'] },
      },
      ],
    });
    return matches;
  }

  public async matchesInProgress(inProgress: boolean): Promise<Matche[]> {
    const matches = await this.matche.findAll(
      {
        where: { inProgress },
        include: [
          { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
          { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
        ] },
    );
    return matches;
  }

  public async create(matches: IMatches): Promise<Matche> {
    const newMatche = await this.matche.create({ ...matches, inProgress: true });
    if (!newMatche) {
      throw new HttpException(500, 'errou');
    }
    return newMatche as Matche;
  }

  public async updateStatus(id: string): Promise<number> {
    const [findMach] = await this.matche.update(
      { inProgress: false },
      { where: { id } },
    );
    return findMach;
  }

  public async updateMatche(id: string, homeTeamGoals: string, awayTeamGoals: string) {
    const [findMach] = await this.matche.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return findMach;
  }
}

export default MatcheService;
