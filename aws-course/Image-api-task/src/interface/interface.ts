export interface EventBody<T> {
  body: T;
}

export interface Event {
  requestContext: { authorizer: { claims: { email: string } } };
  pathParameters: {
    image: string;
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
