import { Request, Response, NextFunction } from 'express';

export default (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { message, name } = err;
  let code = 500;
  switch (name) {
    case 'ValidationError': code = 400; break;
    case 'UnauthorizedError': code = 401; break;
    default:
      break;
  }
  res.status(code || 500).json({ message });
};
