export const queryStringParameters = {
  type: 'object',
  properties: {
    years: { type: 'string' },
  },
  required: ['years'],
} as const;
