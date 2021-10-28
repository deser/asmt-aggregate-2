import { pathParams } from './schema';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import lambdaLogger from '@libs/lambdaLogger';
import SoccerClient from '@libs/clients/soccer';
import SoccerService from '@libs/services/soccer';

const BASE_URL = process.env.SOCCER_MATCHES_API_BASE_URL!;

const handler: ValidatedEventAPIGatewayProxyEvent<typeof pathParams> = async (event) => {
  const yearsParam = event.pathParameters.years;
  lambdaLogger.info('received aggregation request', { yearsParam });

  const soccerService = new SoccerService({ soccerClient: new SoccerClient({ baseURL: BASE_URL }) });
  const aggregatedData = await soccerService.aggregateMatchesByYears(yearsParam.split(','));

  return formatJSONResponse(aggregatedData);
};

export default middyfy(handler, { pathParameters: pathParams });
