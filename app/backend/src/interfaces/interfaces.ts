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
