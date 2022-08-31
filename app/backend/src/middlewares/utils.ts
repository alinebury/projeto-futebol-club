const throwNotFoundError = (message: string) => {
  const error = new Error(message);
  error.name = 'NotFoundError';
  throw error;
};

const throwValidationError = (message: string) => {
  const error = new Error(message);
  error.name = 'ValidationError';
  throw error;
};

const throwConflictionError = (message: string) => {
  const error = new Error(message);
  error.name = 'ConflictError';
  throw error;
};

export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}

export {
  throwNotFoundError,
  throwValidationError,
  throwConflictionError,
};
