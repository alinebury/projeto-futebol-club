import Team from '../database/models/Team';

export default class TeamsService {
  public model;
  constructor() {
    this.model = Team;
  }

  async getAllTeams(): Promise<Team[]> {
    const teams = await this.model.findAll();
    console.log(teams);
    return teams;
  }

  async getTeamById(id: string): Promise<Team> {
    const team = await this.model.findOne({
      where: { id },
    });

    return team as Team;
  }
}
