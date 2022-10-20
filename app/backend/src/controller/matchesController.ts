import { Request, Response } from 'express';
import MatcheService from '../services/mactheSevice';

class MatchesController {
  private matcheService = new MatcheService();

  public async getAll(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (!inProgress) {
      const matches = await this.matcheService.getAll();
      return res.status(200).json(matches);
    }

    const progress = (inProgress === 'true');
    const matchesInProgress = await this.matcheService.matchesInProgress(progress);
    return res.status(201).json(matchesInProgress);
  }

  public async create(req: Request, res: Response) : Promise<Response> {
    const newMatche = await this.matcheService.create(req.body);
    return res.status(201).json(newMatche);
  }

  public async updateStatus(req: Request, res: Response) : Promise<Response> {
    const { id } = req.params;
    const status = await this.matcheService.updateStatus(id);
    if (status === 1) {
      return res.status(200).json('Finished');
    }
    return res.status(500).json('Finished');
  }

  public async updateMatche(req: Request, res: Response) : Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this.matcheService.updateMatche(id, homeTeamGoals, awayTeamGoals);
    return res.status(200).json('Finished');
  }
}

export default MatchesController;
