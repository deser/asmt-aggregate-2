/*
 * Copyright © 2021. EPAM Systems, Inc. All Rights Reserved. All information contained herein is, and remains the
 * property of EPAM Systems, Inc. and/or its suppliers and is protected by international intellectual
 * property law. Dissemination of this information or reproduction of this material is strictly forbidden,
 * unless prior written permission is obtained from EPAM Systems, Inc
 *
 */

import { BaseLogger, LoggerError, LogParams } from './baseLogger';

export interface LambdaLogData extends LoggerError {
  level: string;
  lambdaName: string;
  lambdaVersion: string;
  xRayTraceId: string;
  message: string;
  timestamp: string;
  params?: LogParams;
}

export class LambdaLogger extends BaseLogger<LambdaLogData> {
  private lambdaName: string;
  private lambdaVersion: string;

  constructor() {
    super();
    this.lambdaName = process.env.AWS_LAMBDA_FUNCTION_NAME ?? '[lambda name is unknown]';
    this.lambdaVersion = process.env.AWS_LAMBDA_FUNCTION_VERSION ?? '[lambda version is unknown]';
  }

  private getXrayTraceId(): string {
    return process.env._X_AMZN_TRACE_ID ?? '[x-ray traceId is unknown]';
  }

  protected populateLogData(level: string, msg: string, params?: LogParams): LambdaLogData {
    return {
      level,
      lambdaName: this.lambdaName,
      lambdaVersion: this.lambdaVersion,
      xRayTraceId: this.getXrayTraceId(),
      message: msg,
      timestamp: new Date(Date.now()).toISOString(),
      params,
    };
  }
}
