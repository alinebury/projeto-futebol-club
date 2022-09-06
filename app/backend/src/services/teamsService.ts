import Team from '../database/models/Team';
import NotFoundError from '../middlewares/NotFoundError';

export default class TeamsService {
  public model;
  constructor() {
    this.model = Team;
  }

  async getAllTeams(): Promise<Team[]> {
    const teams = await this.model.findAll();

    return teams;
  }

  async getTeamById(id: string): Promise<Team> {
    const team = await this.model.findOne({
      where: { id },
    });

    if (!team) throw new NotFoundError('There is no team with such id!');

    return team as Team;
  }
}
