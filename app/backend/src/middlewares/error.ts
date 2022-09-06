import { Request, Response, NextFunction } from 'express';
import { StatusCodes as HTTP } from 'http-status-codes';

export default (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { message, name } = err;
  let code = HTTP.INTERNAL_SERVER_ERROR;
  switch (name) {
    case 'ValidationError': code = HTTP.BAD_REQUEST; break;
    case 'UnauthorizedError': code = HTTP.UNAUTHORIZED; break;
    case 'ConflictError': code = HTTP.FORBIDDEN; break;
    case 'NotFoundError': code = HTTP.NOT_FOUND; break;
    default:
      break;
  }
  res.status(code).json({ message });
};
