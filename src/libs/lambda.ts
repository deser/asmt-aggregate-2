import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import validator from '@middy/validator';
import { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';

export const middyfy = <T extends ValidatedEventAPIGatewayProxyEvent<any>>(
  handler: T,
  schema: Record<string, unknown>
) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(
      validator({
        inputSchema: schema,
      })
    );
};
