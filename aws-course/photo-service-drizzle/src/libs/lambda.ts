import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import type {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Callback,
  Context,
} from 'aws-lambda';
import { ObjectSchema } from 'joi';
import { drizzle } from 'drizzle-orm-pg/node';
import pg from 'pg';
const { Client } = pg;

import { ErrorBoom } from '../interface/interface';

const middlewareJoiValidate = (
  validateSchema?: ObjectSchema,
): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn = async (request): Promise<void> => {
    if (request.event.body && validateSchema) {
      try {
        const value = await validateSchema.validateAsync(request.event.body);
        console.log('value: ', value);
      } catch (error) {
        console.log(error);
        // Initialize response
        request.response = request.response ?? {};

        const bodyError = { error: { massage: error.details[0].message } };

        request.response = {
          body: JSON.stringify(bodyError),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': '*',
            'Access-Control-Allow-Methods': '*',
            // prettier-ignore
            "Accept": '*/*',
            'Content-Type': 'application/json',
          },
          statusCode: 400,
        };

        return request.response;
      }
    }
  };
  return { before };
};

const middlewareConnectionDB = (): middy.MiddlewareObj<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> => {
  const before: middy.MiddlewareFn = async (request): Promise<void> => {
    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: true,
    });
    await client.connect();
    const db = drizzle(client);

    if (request.event.body !== null) {
      request.event.body.connection = db;
    } else {
      request.event.body = {
        connection: db,
      };
    }
    console.log('\n*** request in middlewareConnectionDB: ***', request);
  };

  const after: middy.MiddlewareFn = async (request): Promise<void> => {
    const { connection } = request.event.body;
    await connection.end(err => {
      if (err) {
        console.log('\n*** endConnect --> err: ***', err);
        return err;
      } else {
        console.log('\n*** connect --> END ***');
      }
    });
  };
  return { before, after };
};

const middlewareEditResponse = (): middy.MiddlewareObj<
  APIGatewayProxyEvent,
  APIGatewayProxyResult
> => {
  const after: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult
  > = async (request): Promise<void> => {
    // console.log('\n*** request before: ***', JSON.stringify(request.response));
    const body = request.response;
    request.response = {
      body: JSON.stringify(body),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        // prettier-ignore
        "Accept": '*/*',
        'Content-Type': 'application/json',
      },
      statusCode: 200,
    };
    // console.log('\n*** request after: ***', JSON.stringify(request.response));
  };

  const onError: middy.MiddlewareFn<
    APIGatewayProxyEvent,
    APIGatewayProxyResult,
    ErrorBoom
  > = async (request): Promise<void> => {
    // console.log('*** onError ***: ', request);
    console.log('\n*** onError ***: \n', request.error);

    const body = { error: { message: request.error.message || request.error } };
    const statusCode = request.error.output.statusCode || 500;

    request.response = {
      body: JSON.stringify(body),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': '*',
        // prettier-ignore
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
      statusCode: statusCode,
    };
  };
  return { after, onError };
};

export const middyfy = (
  handler: {
    (event: any, context: Context, callback: Callback<any>);
  },
  validateSchema?: ObjectSchema,
) => {
  return middy(handler)
    .use(middyJsonBodyParser())
    .use(middlewareJoiValidate(validateSchema))
    .use(middlewareConnectionDB())
    .use(middlewareEditResponse());
};
