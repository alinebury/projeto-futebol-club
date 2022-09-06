// const throwNotFoundError = (message: string) => {
//   const error = new Error(message);
//   error.name = 'NotFoundError';
//   throw error;
// };

// const throwValidationError = (message: string) => {
//   const error = new Error(message);
//   error.name = 'ValidationError';
//   throw error;
// };

export default class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
