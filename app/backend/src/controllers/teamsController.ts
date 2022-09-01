import { StatusCodes as HTTP } from 'http-status-codes';
import { Request, Response } from 'express';
import TeamsService from '../services/teamsService';

export default class TeamsController {
  private teamsService: TeamsService;
  constructor() {
    this.teamsService = new TeamsService();
  }

  async getAllTeams(req: Request, res: Response): Promise<void> {
    const teams = await this.teamsService.getAllTeams();

    res.status(HTTP.OK).json(teams);
  }

  async getTeamById({ params }: Request, res: Response): Promise<void> {
    const team = await this.teamsService.getTeamById(params.id);

    res.status(HTTP.OK).json(team);
  }
}
