import { StatusCodes as HTTP } from 'http-status-codes';
import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboardService';

export default class LeaderboardController {
  private leaderboardService: LeaderboardService;
  constructor() {
    this.leaderboardService = new LeaderboardService();
  }

  async getHome(req: Request, res: Response): Promise<void> {
    const leaderboard = await this.leaderboardService.getAll();
    const matches = await this.leaderboardService.getLeaderboard(leaderboard, true);

    res.status(HTTP.OK).json(matches);
  }

  async getAway(req: Request, res: Response): Promise<void> {
    const leaderboard = await this.leaderboardService.getAll();
    const matches = await this.leaderboardService.getLeaderboard(leaderboard, false);

    res.status(HTTP.OK).json(matches);
  }

  async getAll(req: Request, res: Response): Promise<void> {
    const leaderboard = await this.leaderboardService.getAll();
    const matches = await this.leaderboardService.getLeaderboardAll(leaderboard);

    res.status(HTTP.OK).json(matches);
  }
}
