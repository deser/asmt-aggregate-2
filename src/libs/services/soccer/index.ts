import SoccerClient from '@libs/clients/soccer';
import calculateMaxWin, { MostWin } from '@libs/services/soccer/calculateMaxWin';

interface AggregateMatchesByYears {
  mostWin: MostWin;
  mostScoredPerGame: {
    team: string;
    amount: number;
  };
  lessReceivedPerGame: {
    team: string;
    amount: number;
  };
}

export default class SoccerService {
  private soccerClient: SoccerClient;

  constructor({ soccerClient }: { soccerClient: SoccerClient }) {
    this.soccerClient = soccerClient;
  }

  async aggregateMatchesByYears(years: string[]): Promise<AggregateMatchesByYears> {
    const promises = years.map((year) => this.soccerClient.getMatches(year));
    const resultsForAllYears = (await Promise.all(promises)).flat();

    return {
      mostWin: calculateMaxWin(resultsForAllYears),
      mostScoredPerGame: {
        team: 'not done yet',
        amount: 0,
      },
      lessReceivedPerGame: {
        team: 'not done yet',
        amount: 0,
      },
    };
  }
}
