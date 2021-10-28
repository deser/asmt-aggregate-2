import SoccerClient from '@libs/clients/soccer';
import calculateMaxWin, { MostWin } from '@libs/services/soccer/calculateMaxWin';
import logger from '@libs/lambdaLogger';

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
    logger.info('starting to get all soccer matches results');
    const resultsForAllYears = (await Promise.all(promises)).flat();
    logger.info('all soccer matches results received');

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
