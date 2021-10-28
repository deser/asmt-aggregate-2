/*
 * Copyright © 2021. EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 *
 */

import type { AxiosError } from 'axios';
import axios from 'axios';

/* eslint-disable  no-console */

export type LogParams = Record<string, unknown>;

export interface LoggerError {
  error?: {
    errorName: string;
    errorMessage: string;
    stackTrace: string | undefined;
  };
  // if error comes from axios then we can log additional data
  httpErrorData?: {
    url?: string;
    method?: string;
    status?: number;
    apiResponseData?: unknown;
  };
}

export abstract class BaseLogger<LogData extends LoggerError> {
  protected abstract populateLogData(level: string, msg: string, params?: LogParams): LogData;

  protected format(level: string, msg: string, params?: LogParams, error?: Error) {
    const logData = this.populateLogData(level, msg, params);
    if (error) {
      logData.error =
        error instanceof Error
          ? {
              errorName: error.name,
              errorMessage: error.message,
              stackTrace: error.stack,
            }
          : error;

      if (axios.isAxiosError(error)) {
        const errorResponse: AxiosError['response'] = error.response;

        logData.httpErrorData = {
          url: errorResponse?.config?.url,
          method: errorResponse?.config?.method,
          status: errorResponse?.status,
          apiResponseData: errorResponse?.data,
        };
      }
    }

    let stringifiedLogData = '[unable to stringify log data]';
    try {
      stringifiedLogData = JSON.stringify(logData);
    } catch (e) {
      // eslint-disable-next-line no-empty
    }

    return stringifiedLogData;
  }

  info(msg: string, params?: LogParams): void {
    console.log(this.format('INFO', msg, params));
  }

  debug(msg: string, params: LogParams): void {
    console.debug(this.format('DEBUG', msg, params));
  }

  error(msg: string, params: LogParams, error: Error): void {
    console.error(this.format('ERROR', msg, params, error));
  }

  warn(msg: string, params: LogParams, error?: Error): void {
    console.warn(this.format('WARN', msg, params, error));
  }
}
