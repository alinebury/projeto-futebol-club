import Match from '../database/models/Matches';
import TeamsService from './teamsService';
import Team from '../database/models/Team';
import { MatchDetails, Goal } from '../interfaces/interfaces';

export default class LeaderboardService {
  public modelMatch;
  public modelTeam;
  private teamsService: TeamsService;

  constructor() {
    this.modelMatch = Match;
    this.modelTeam = Team;
    this.teamsService = new TeamsService();
  }

  public async getLeaderboard(data: Match[], home: boolean): Promise<MatchDetails[]> {
    const team = home ? 'home' : 'away';
    const newData = await Promise.all(data.map(async (match) => {
      const id = match[`${team}Team`];
      const { teamName } = await this.teamsService.getTeamById(id);
      const matches = data.filter((teamMatch) => teamMatch[`${team}Team`] === id);
      const total = await LeaderboardService.calculatePointsTeam(matches, home);
      const goals = await LeaderboardService.calculateGoalsTeam(matches, home);
      return {
        name: teamName,
        ...total,
        ...goals,
        efficiency: ((total.totalPoints / (total.totalGames * 3)) * 100).toFixed(2),
      };
    }));
    const result = await LeaderboardService.filterDuplicate(newData);
    const sort = await LeaderboardService.sortDesc(result);
    return sort;
  }

  static async calculatePointsTeam(matches: Match[], home: boolean): Promise<MatchDetails> {
    const team1 = home ? 'home' : 'away';
    const team2 = home ? 'away' : 'home';
    const points = matches.map((match) => {
      let point = 0;
      if (match[`${team1}TeamGoals`] > match[`${team2}TeamGoals`]) point = 3;
      else if (match[`${team1}TeamGoals`] === match[`${team2}TeamGoals`]) point = 1;
      else point = 0;
      return point;
    });
    const data = {
      totalPoints: points.reduce((a, b) => a + b, 0),
      totalGames: matches.length,
      totalVictories: points.filter((victory) => victory === 3).length,
      totalDraws: points.filter((draw) => draw === 1).length,
      totalLosses: points.filter((loss) => loss === 0).length,
    };
    return data as MatchDetails;
  }

  static async calculateGoalsTeam(matches: Match[], home: boolean): Promise<Goal> {
    const team1 = home ? 'home' : 'away';
    const team2 = home ? 'away' : 'home';
    const goalsFavor = matches.map((match) => match[`${team1}TeamGoals`])
      .reduce((a, b) => a + b, 0);
    const goalsOwn = matches.map((match) => match[`${team2}TeamGoals`])
      .reduce((a, b) => a + b, 0);
    const goalsBalance = goalsFavor - goalsOwn;
    return {
      goalsFavor,
      goalsOwn,
      goalsBalance,
    };
  }

  public async getLeaderboardAll(data: Match[]): Promise<MatchDetails[]> {
    const newData = await Promise.all(data.map(async (match) => {
      const id = match.homeTeam;
      const { teamName } = await this.teamsService.getTeamById(id);
      const matches = data
        .filter((teamMatch) => teamMatch.homeTeam === id || teamMatch.awayTeam === id);
      const total = await LeaderboardService.calculatePoints(matches, id);
      const goals = await LeaderboardService.calculateGoals(matches, id);
      return {
        name: teamName,
        ...total,
        ...goals,
        efficiency: ((total.totalPoints / (total.totalGames * 3)) * 100).toFixed(2),
      };
    }));
    const result = await LeaderboardService.filterDuplicate(newData);
    const sort = await LeaderboardService.sortDesc(result);
    return sort as MatchDetails[];
  }

  static async calculatePoints(matches: Match[], id: number): Promise<MatchDetails> {
    const points = matches.map((match) => {
      const team1 = match.homeTeam === id ? 'home' : 'away';
      const team2 = match.awayTeam === id ? 'home' : 'away';
      let point = 0;
      if (match[`${team1}TeamGoals`] > match[`${team2}TeamGoals`]) point = 3;
      if (match[`${team1}TeamGoals`] === match[`${team2}TeamGoals`]) point = 1;
      return point;
    });
    const data = {
      totalPoints: points.reduce((a, b) => a + b),
      totalGames: matches.length,
      totalVictories: points.filter((victory) => victory === 3).length,
      totalDraws: points.filter((draw) => draw === 1).length,
      totalLosses: points.filter((loss) => loss === 0).length,
    };
    return data as MatchDetails;
  }

  static async calculateGoals(matches: Match[], id: number): Promise<Goal> {
    const goalsFavor = matches.map((match) => (match.homeTeam === id
      ? match.homeTeamGoals : match.awayTeamGoals))
      .reduce((a, b) => a + b);
    const goalsOwn = matches.map((match) => (match.homeTeam === id
      ? match.awayTeamGoals : match.homeTeamGoals))
      .reduce((a, b) => a + b);
    const goalsBalance = goalsFavor - goalsOwn;
    return {
      goalsFavor,
      goalsOwn,
      goalsBalance,
    };
  }

  static async filterDuplicate(matches: MatchDetails[]): Promise<MatchDetails[]> {
    const filter: MatchDetails[] = [];
    matches.forEach((match) => {
      if (filter.every((team) => match.name !== team.name)) filter.push(match);
    });
    return filter;
  }

  static async sortDesc(matchs: MatchDetails[]): Promise<MatchDetails[]> {
    const result = matchs.sort((a, b) => b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor
      || b.goalsOwn - a.goalsOwn);
    return result;
  }

  async getAll(): Promise<Match[]> {
    const data = await this.modelMatch.findAll({ where: { inProgress: false }, raw: true });

    return data as Match[];
  }
}
