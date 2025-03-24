export class ResponseError extends Error {
	code?: number;
	requestId?: string;

	constructor(message: string | undefined, code?: number, requestId?: string) {
		super(
			message ||
				"API error happened while trying to communicate with the server.",
		);
		this.code = code;
		this.requestId = requestId;
	}
}
