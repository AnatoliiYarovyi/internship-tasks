import {
	APIGatewayEventRequestContext as APIGatewayEventRequestContextBase,
	APIGatewayProxyCognitoAuthorizer,
} from 'aws-lambda';

export interface APIGatewayEvent<TBody> {
	Input: { Payload: { body: TBody } };
	requestContext: APIGatewayEventRequestContext;
	body: TBody;
	headers: { [name: string]: string };

	userPoolId: string;
	userName: string;
	triggerSource: string;
	request: APIGatewayEventRequest;
	response: { [name: string]: string };

	multiValueHeaders: { [name: string]: string[] };
	httpMethod: string;
	isBase64Encoded: boolean;
	path: string;
	pathParameters: { [name: string]: string };
	queryStringParameters: { [name: string]: string };
	multiValueQueryStringParameters: { [name: string]: unknown[] };
	stageVariables: { [name: string]: string } | null;
	resource: string;
	fieldName: string;

	Records: Array<{ body: string }>;
}

interface APIGatewayEventRequestContext
	extends APIGatewayEventRequestContextBase {
	authorizer: Identity;
}

interface Identity extends APIGatewayProxyCognitoAuthorizer {
	scope: string;
	principalId: string;
	role: string;
	groups: [string];
	sourceIp: [string];
}

export interface APIGatewayEventRequest {
	clientMetadata: { domain: string };
	codeParameter: string;
	userAttributes: { [name: string]: string };
}
