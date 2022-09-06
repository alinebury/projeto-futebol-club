import { StatusCodes as HTTP } from 'http-status-codes';
import { Request, Response } from 'express';
import MatchesService from '../services/matchesService';
import UsersService from '../services/usersService';

export default class MatchesController {
  private matchesService: MatchesService;
  constructor() {
    this.matchesService = new MatchesService();
  }

  async getAllMatches(req: Request, res: Response): Promise<void> {
    const matches = await this.matchesService.getAllMatches();

    res.status(HTTP.OK).json(matches);
  }

  async getByStatus(req: Request, res: Response): Promise<void> {
    const { inProgress } = req.query;
    const matches = await this.matchesService.getByStatus(inProgress as string);

    res.status(HTTP.OK).json(matches);
  }

  async addMatch(req: Request, res: Response): Promise<void> {
    await MatchesService.validateBodyMatch(req.body);
    await UsersService.readToken(req);
    const match = await this.matchesService.addMatch(req.body);

    res.status(HTTP.CREATED).json(match);
  }

  async editProgress(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await this.matchesService.getMatchById(id);
    await this.matchesService.editProgress(id);

    res.status(HTTP.OK).json({ message: 'Finished' });
  }
}
