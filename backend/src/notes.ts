import { ContributionWeek } from "../types/GitHub";

export default function convertContributionsToNotes(
  contributions: ContributionWeek[]
): string[][] {
  const chords: string[][] = [];

  const noteMap = {
    0: "C",
    1: "D",
    2: "E",
    3: "F",
    4: "G",
    5: "A",
    6: "B",
  };

  for (let j = 0; j < contributions.length; j++) {
    const weeklyContribution = contributions[j];

    const notes: string[] = [];
    for (let i = 0; i < weeklyContribution.contributionDays.length; i++) {
      const contributionDay = weeklyContribution.contributionDays[i];
      if (contributionDay.contributionCount > 0) {
        notes.push(noteMap[i as keyof typeof noteMap]);
      }
    }
    chords.push(notes);
  }

  return chords;
}
