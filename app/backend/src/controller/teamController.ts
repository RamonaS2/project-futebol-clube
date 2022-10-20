import { Request, Response } from 'express';
import TeamSevice from '../services/teamsSevice';

class TeamController {
  private teamSevice = new TeamSevice();

  public async getAll(req: Request, res: Response): Promise<Response> {
    const teams = await this.teamSevice.getAll();
    return res.status(200).json(teams);
  }

  public async getById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const team = await this.teamSevice.getById(+id);
    return res.status(200).json(team);
  }
}

export default TeamController;
