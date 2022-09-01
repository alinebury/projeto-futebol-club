import Match from '../database/models/Matches';
import Team from '../database/models/Team';

export default class MatchesService {
  public modelMatch;
  public modelTeam;
  constructor() {
    this.modelMatch = Match;
    this.modelTeam = Team;
  }

  async getAllMatches(): Promise<Match[]> {
    const matches = await this.modelMatch.findAll({
      include:
      [
        {
          model: this.modelTeam,
          as: 'teamHome',
          // attributes: { exclude: ['id'] },
        },
        {
          model: this.modelTeam,
          as: 'teamAway',
          // attributes: { exclude: ['id'] },
        },
      ],
    });

    return matches;
  }
}
