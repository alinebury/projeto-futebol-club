export interface Login {
  role?: string;
  email?: string;
  username: string;
  data: {
    username: string;
  }
}

export interface NewMatch {
  homeTeam?: number;
  awayTeam?: number;
  homeTeamGoals?: number;
  awayTeamGoals?: number;
}

export interface MatchDetails {
  name?: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number | string;
}

export interface Goal {
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
}
