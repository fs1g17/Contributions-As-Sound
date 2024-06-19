export interface ContributionsQueryResponseType {
  data: Data
}

export interface Data {
  user: User
}

export interface User {
  contributionsCollection: ContributionCollection
}

export interface ContributionCollection {
  contributionCalendar: ContributionCalendar
}

export interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[]
}

export interface ContributionWeek {
  contributionDays: ContributionDay[]
}

export interface ContributionDay {
  contributionCount: number,
  date: string
}
