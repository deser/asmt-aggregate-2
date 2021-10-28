import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

export const middyfy = <T extends ValidatedEventAPIGatewayProxyEvent<any>>(handler: T) => {
  return middy(handler).use(middyJsonBodyParser());
};
