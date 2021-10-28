import { handlerPath } from '@libs/handlerResolver';

export default {
  aggregateSoccerMatches: {
    handler: `${handlerPath(__dirname)}/hello/aggregateSoccerMatches.default`,
    events: [
      {
        http: {
          method: 'get',
          path: '/aggregate',
          environment: {
            SOCCER_MATCHES_API_BASE_URL: 'http://ase.asmt.live:8000/soccer',
          },
        },
      },
    ],
  },
};
