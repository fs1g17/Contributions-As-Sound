import axios from 'axios';
import { ContributionsQueryResponseType, ContributionWeek } from '../types/GitHub';

export async function getUsersContributions(githubPat: string, username: string): Promise<ContributionWeek[]> {
  const response = await axios<ContributionsQueryResponseType>({
    url: "https://api.github.com/graphql",
    method: "POST",
    data: {
      query: `
        query { 
          user(login: "${username}"){
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    contributionCount
                    date
                  }
                }
              }
            }
          }
        }
        `
    },
    headers: {
      Authorization: `Bearer ${githubPat}`
    }
  });

  return response.data.data.user.contributionsCollection.contributionCalendar.weeks
}