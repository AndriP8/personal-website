import express, { Router } from 'express';

import { createUserController, loginUserController } from './controller';

export const userRoute = express.Router() as Router;
userRoute.post('/api/users', (req, res, next) =>
  createUserController(req, res, next)
);
userRoute.post('/api/users/login', (req, res, next) =>
  loginUserController(req, res, next)
);
