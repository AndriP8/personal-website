import { NextFunction, Request, Response } from 'express';

import { createNewUser } from './service';

export const createUserController = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = req.body;
    createNewUser(request, res);
  } catch (e) {
    next(e);
  }
};
