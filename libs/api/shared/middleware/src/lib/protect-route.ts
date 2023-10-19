import { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export const protectRoute = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.send({ message: 'Not authorized' });
    return;
  }

  const [, token] = bearer.split(' ');
  if (!token) {
    res.status(401);
    res.send({ message: 'Not authorized' });
    return;
  }

  try {
    const payload = jose.jwtVerify(token, secret);
    req.body.user = payload;
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send({ message: 'Not authorized' });
    return;
  }
};
