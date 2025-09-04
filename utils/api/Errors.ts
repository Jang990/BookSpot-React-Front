export class ApiError extends Error {
  public status: number;
  public body?: any;
  constructor(message: string, status = 500, body?: any) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export class ClientError extends ApiError {
  constructor(body?: any) {
    super("Client Error", 400, body);
    this.name = "ClientError";
  }
}

export class UnauthorizedError extends ApiError {
  constructor(body?: any) {
    super("Unauthorized", 401, body);
    this.name = "UnauthorizedError";
  }
}

export class RateLimitError extends ApiError {
  public retryAfter?: number | string;
  constructor(body?: any, retryAfter?: number | string) {
    super("Rate Limited", 429, body);
    this.name = "RateLimitError";
    this.retryAfter = retryAfter;
  }
}

export class ServerError extends ApiError {
  constructor(body?: any) {
    super("Server Error", 500, body);
    this.name = "ServerError";
  }
}
