/* eslint-disable no-template-curly-in-string */

import type { AWS } from '@serverless/typescript';

import functionDefinitions from '@functions/index';

const serverlessConfiguration: AWS = {
  service: 'aggregator',
  configValidationMode: 'error',
  frameworkVersion: '2',
  package: {
    individually: true,
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk', '*.test.ts', 'test/*'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
    },
  },
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    region: 'us-east-1',
    runtime: 'nodejs14.x',
    memorySize: 512,
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      SOCCER_MATCHES_API_BASE_URL: 'http://ase.asmt.live:8000/soccer',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: { ...functionDefinitions },
};

module.exports = serverlessConfiguration;
