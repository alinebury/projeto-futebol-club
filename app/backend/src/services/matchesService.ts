import * as Joi from 'joi';
import Match from '../database/models/Matches';
import Team from '../database/models/Team';
import NotFoundError from '../middlewares/NotFoundError';
import UnauthorizedError from '../middlewares/UnauthoriedError';
import { NewMatch } from '../interfaces/interfaces';

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
          attributes: { exclude: ['id'] },
        },
        {
          model: this.modelTeam,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });

    return matches;
  }

  async getByStatus(status: string): Promise<Match[]> {
    const progress = !!status.includes('true');
    const matches = await this.modelMatch.findAll({
      where: { inProgress: progress },
    });

    return matches;
  }

  public static async validateBodyMatch(match: object): Promise<void> {
    const schema = Joi.object({
      homeTeam: Joi.number().required(),
      awayTeam: Joi.number().required(),
      homeTeamGoals: Joi.number().required(),
      awayTeamGoals: Joi.number().required(),
      inProgress: Joi.boolean().optional(),
    });
    await schema.validateAsync(match);
  }

  async addMatch(match: NewMatch): Promise<object> {
    const addMatch = { ...match, inProgress: true };
    const create = await this.modelMatch.create(addMatch);

    return create;
  }

  async getMatch(id: string): Promise<Match> {
    const match = await this.modelMatch.findOne({
      where: { id },
    });

    return match as Match;
  }

  async editProgress(id: string): Promise<void> {
    await this.modelMatch.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  async getMatchById(id: string): Promise<void> {
    const match = await this.modelMatch.findOne({ where: { id } });

    if (!match) throw new NotFoundError('Match not found');
  }

  async validateTeam(homeTeam: number, awayTeam: number): Promise<void> {
    if (homeTeam === awayTeam) {
      throw new UnauthorizedError('It is not possible to create a match with two equal teams');
    }
    const team = await this.modelTeam.findAll({
      where: {
        id: [homeTeam, awayTeam],
      },
      raw: true,
    });

    if (team.length !== 2) throw new NotFoundError('There is no team with such id!');
  }

  // async editMatch(body: any, id: any): Promise<any> {
  //   const match = await this.modelMatch.update(
  //     { body },
  //     { where: { id } },
  //   );

  //   return match;
  // }
}
