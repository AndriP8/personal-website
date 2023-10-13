import { NextFunction, Request, Response } from 'express';

import { createUserService, loginUserService } from './service';

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = req.body;
    await createUserService(request, res);
  } catch (e) {
    next(e);
  }
};
export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = req.body;
    await loginUserService(request, res);
  } catch (e) {
    next(e);
  }
};
