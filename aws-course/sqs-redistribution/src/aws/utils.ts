export interface ErrorResponse {
	error: {
		statusCode: string;
		type: string;
		status: string;
		message?: string;
		payload?: unknown;
	};
}

export type ResponsePayload<T> = T extends APIGatewayResponse<infer TPayload>
	? TPayload
	: never;

export class APIGatewayResponseClass<TBody> {
	statusCode: number;

	body: TBody;

	headers: { [key: string]: string };

	isBase64Encoded: boolean;

	constructor({
		statusCode = 200,
		body,
		headers = {},
		isBase64Encoded = false,
	}: {
		body: TBody;
		statusCode?: number;
		headers?: { [key in string]: string };
		isBase64Encoded?: boolean;
	}) {
		this.statusCode = statusCode;
		this.body = body;
		this.headers = headers;
		this.isBase64Encoded = isBase64Encoded;
	}

	toJSON() {
		return {
			statusCode: this.statusCode,
			body:
				typeof this.body === 'string'
					? this.body
					: JSON.stringify(this.body),
			headers: this.headers,
			isBase64Encoded: this.isBase64Encoded,
		};
	}
}

export type APIGatewayResponse<T> =
	| T
	| APIGatewayResponseClass<T | ErrorResponse>;
