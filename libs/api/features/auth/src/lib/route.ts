import express, { Router } from 'express';

import { createUserController } from './controller';

export const userRoute = express.Router() as Router;
userRoute.post('/api/users', async (req, res, next) =>
  createUserController(req, res, next)
);
