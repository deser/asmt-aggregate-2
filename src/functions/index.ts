import { handlerPath } from '@libs/handlerResolver';

export const hello = {
  handler: `${handlerPath(__dirname)}/hello/handler.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/aggregate',
      },
    },
  ],
};
