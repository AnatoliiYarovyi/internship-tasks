import { PgDatabase } from 'drizzle-orm-pg/db';

export interface EventBody<T> {
  body: T;
}

export interface Event {
  headers: any;
  body: {
    connection: PgDatabase;
    albumName: string;
    location: string;
    specifiedTimestamp: string;
    fullName: string;
    email: string;
  };
  requestContext: {
    authorizer: {
      claims: {
        // email: string;
        nickname: string;
      };
    };
  };
  pathParameters: {
    album: string;
  };
  queryStringParameters: {
    albumName: string;
    permission: string;
    albumId: number;
    clientId: string;
    photoId: number;
    nickname: string;
  };
}
export interface Album {
  id: number;
  name: string;
  location: string;
  timestamp: number;
}

export interface ErrorBoom {
  name: string;
  message: string;
  code: string;
  time: string;
  requestId: string;
  statusCode: number;
  retryable: boolean;
  retryDelay: number;
  isBoom: boolean;
  isServer: boolean;
  data: null;
  output: {
    statusCode: number;
    payload: {
      statusCode: number;
      error: string;
      message: string;
    };
    headers: any;
  };
}
