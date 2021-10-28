import promiseRetry from 'promise-retry';

export function retryAllErrors<T>(fn: (...args: any) => Promise<T>): Promise<T> {
  return promiseRetry<T>(
    (retry) => {
      return fn().catch(retry);
    },
    {
      retries: 10,
      factor: 1,
      minTimeout: 10 /* milliseconds */,
    }
  );
}
