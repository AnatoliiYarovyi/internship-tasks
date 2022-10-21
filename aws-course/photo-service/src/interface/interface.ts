import mysql from 'mysql2/promise';

export interface EventBody<T> {
  body: T;
}

export interface Event {
  body: {
    connection: mysql.Connection;
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
  };
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
