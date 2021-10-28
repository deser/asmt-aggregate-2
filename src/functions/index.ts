import { AWS } from '@serverless/typescript';
import { handlerPath } from '@libs/handlerResolver';

const functions: AWS['functions'] = {
  aggregateSoccerMatches: {
    handler: `${handlerPath(__dirname)}/aggregateSoccerMatches/handler.default`,
    events: [
      {
        http: {
          method: 'get',
          path: '/v1/aggregate',
        },
      },
    ],
    timeout: 15,
  },
};

export default functions;
