export type Day = {
  date: Date
  contributions: number
  level: number
}

export type GithubContributions = {
  totalContributions: number
  lastContribution: Date
  days: Day[]
  weeks: Array<Array<Day | null>>
  calendar: Array<Array<Day | null>>
}

export function githubContributions(username: string): Promise<GithubContributions>