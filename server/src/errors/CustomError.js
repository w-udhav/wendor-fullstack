export class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends CustomError {
  constructor(message) {
    super(message || "Validation failed", 400);
  }
}

export class NotFoundError extends CustomError {
  constructor(message) {
    super(message || "Resource not found", 404);
  }
}

export class AuthenticationError extends CustomError {
  constructor(message) {
    super(message || "Authentication failed", 401);
  }
}

export class AuthorizationError extends CustomError {
  constructor(message) {
    super(message || "You are not authorized to perform this action", 403);
  }
}

export class InternalServerError extends CustomError {
  constructor(message) {
    super(message || "Internal server error", 500);
  }
}
