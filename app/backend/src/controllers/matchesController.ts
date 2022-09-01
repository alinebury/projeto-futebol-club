import { StatusCodes as HTTP } from 'http-status-codes';
import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';

export default class MatchesController {
  private matchesService: MatchesService;
  constructor() {
    this.matchesService = new MatchesService();
  }

  async getAllMatches(req: Request, res: Response): Promise<void> {
    const matches = await this.matchesService.getAllMatches();

    res.status(HTTP.OK).json(matches);
  }
}
