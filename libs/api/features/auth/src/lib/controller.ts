import { NextFunction, Request, Response } from 'express';

import { createUserService, loginUserService } from './service';

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = req.body;
    const result = await createUserService(request);
    const { password, ...results } = result;
    res.status(200).json({ data: results });
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
