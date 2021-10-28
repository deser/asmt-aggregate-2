import { groupBy, reduce, sumBy, uniq } from 'lodash';
import { SoccerMatchesHTTPResponseData } from '@libs/clients/soccer';

export interface MostWin {
  team: string;
  amount: number;
}

function calculateSumTeamScoreByPlayType(
  data: SoccerMatchesHTTPResponseData[],
  playType: 'homeTeam' | 'awayTeam'
): Record<string, number> {
  const homeTeamsGrouped = groupBy(data, playType);

  return reduce<typeof homeTeamsGrouped, Record<string, number>>(
    homeTeamsGrouped,
    (acc, value, teamName) => {
      acc[teamName] = sumBy(value, teamName === 'homeTeam' ? 'homeScore' : 'awayScore');
      return acc;
    },
    {}
  );
}

export default function calculateMaxWin(data: SoccerMatchesHTTPResponseData[]): MostWin {
  const homeScoreSumGrouped = calculateSumTeamScoreByPlayType(data, 'homeTeam');
  const awaySumGrouped = calculateSumTeamScoreByPlayType(data, 'awayTeam');
  const allUniqKeys = uniq([...Object.keys(homeScoreSumGrouped), ...Object.keys(awaySumGrouped)]);

  const teamMaxScore = allUniqKeys.reduce<Record<string, number>>((acc, teamName) => {
    acc[teamName] = (homeScoreSumGrouped[teamName] ?? 0) + (awaySumGrouped[teamName] ?? 0);
    return acc;
  }, {});

  let mostWin: MostWin = { team: 'no team', amount: 0 };
  Object.keys(teamMaxScore).forEach((teamName) => {
    if ((teamMaxScore[teamName] ?? 0) > mostWin.amount)
      mostWin = { team: teamName, amount: teamMaxScore[teamName] ?? 0 };
  });

  return mostWin;
}
