import axios, { AxiosInstance } from 'axios';
import logger from '@libs/lambdaLogger';
import { retryAllErrors } from '@libs/promiseRetry';

export interface SoccerMatchesHTTPResponseData {
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  tournament: string;
  city: string;
  country: string;
}

type SoccerMatchesHTTPSuccessfulResponse = SoccerMatchesHTTPResponseData[];

interface SoccerMatchesHTTPFailedResponse {
  errorCode: number;
  errorMessage: string;
}

type SoccerMatchesHTTPResponse = SoccerMatchesHTTPSuccessfulResponse | SoccerMatchesHTTPFailedResponse;

export default class SoccerClient {
  private baseURL: string;
  private axiosClient: AxiosInstance;

  constructor(config: { baseURL: string }) {
    this.baseURL = config.baseURL;
    this.axiosClient = axios.create({ baseURL: this.baseURL });
  }

  async getMatches(year: string): Promise<SoccerMatchesHTTPSuccessfulResponse> {
    // NOTE: I noticed that the API endpoint returns sometimes 200 response with error code inside.
    // Therefore I decided to do best effort to get data eventually
    return retryAllErrors(async () => {
      logger.info('getting soccer match results for year', { year });
      const { data } = await this.axiosClient.get<SoccerMatchesHTTPResponse>(`/${year}`);
      if ('errorCode' in data) {
        logger.info('getting soccer match results for year failed. Retrying', { year, responseData: data });
        throw new Error('Response is erroneous');
      }

      return data;
    });
  }
}
