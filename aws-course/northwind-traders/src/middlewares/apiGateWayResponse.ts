/* eslint-disable no-console */

/* eslint-disable no-param-reassign */
import Boom from '@hapi/boom';
import { MiddlewareObject } from 'middy';
import { cors } from 'middy/middlewares';

import type { APIGatewayEvent } from '../aws/types';
import {
  APIGatewayResponse,
  APIGatewayResponseClass,
  ErrorResponse,
  ResponsePayload,
} from '../aws/utils';

export function apiGatewayResponse<
  TEvent extends APIGatewayEvent<unknown>,
  TResponse extends APIGatewayResponse<any>,
>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _ignoredOpts: {} = {},
): MiddlewareObject<TEvent, APIGatewayResponse<ResponsePayload<TResponse>>> {
  return {
    after: (handler, next) => {
      if (!(handler.response instanceof APIGatewayResponseClass)) {
        handler.response = new APIGatewayResponseClass({
          body: handler.response,
        });
      }

      cors().after?.(handler, next);
    },
    onError: (handler, next) => {
      console.error(handler.error);

      let error: any;
      if (Boom.isBoom(handler.error)) {
        error = handler.error;
      } else {
        error = Boom.internal(handler.error.message);
        error.name = 'InternalError';
      }

      const statusCode = error.statusCode
        ? error.statusCode
        : error.output.statusCode;

      handler.response = new APIGatewayResponseClass<ErrorResponse>({
        statusCode,
        body: {
          error: {
            statusCode,
            type: error.name,
            status: error.code,
            message: error.message ? error.message : 'Internal Server Error',
            payload: error.data ?? undefined,
          },
        },
      });

      // delete handler.error;

      cors().after?.(handler, next);
    },
  };
}
