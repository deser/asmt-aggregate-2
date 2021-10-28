export const pathParams = {
  type: 'object',
  properties: {
    years: { type: 'string' },
  },
  required: ['years'],
} as const;
