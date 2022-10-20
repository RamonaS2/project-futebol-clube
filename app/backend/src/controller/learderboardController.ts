import { Request, Response } from 'express';
import LeaderboardHomeService from '../services/learderboardHome';
import LeaderboardAwayService from '../services/learderboardAway';

export default class LeaderboardController {
  private _leaderboardHome = new LeaderboardHomeService();
  private _leaderboardAway = new LeaderboardAwayService();

  public async getHomeLeaderboard(req: Request, res: Response): Promise<Response> {
    const { status, response } = await this._leaderboardHome.getLeaderboard();

    return res.status(status).json(response);
  }

  public async getAwayLeaderboard(req: Request, res: Response): Promise<Response> {
    const { status, response } = await this._leaderboardAway.getLeaderboard();
    return res.status(status).json(response);
  }
}
