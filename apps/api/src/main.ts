import { userRoute } from '@personal-website/api/features/auth';
import {
  blogRouterBackoffice,
  blogRouterPublic,
} from '@personal-website/api/features/blog';
import {
  error as errorMiddleware,
  protectRoute,
} from '@personal-website/api/shared/middleware';
import cors from 'cors';
import express from 'express';

import { logger } from './app/logging';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: update origin based on domain cms and personal website soon
app.use(cors());

// TODO: consider to protect or not
app.use(userRoute);
app.use(blogRouterPublic);

app.use(protectRoute);

app.use(blogRouterBackoffice);

app.use(errorMiddleware);

app.listen(port, host, () => {
  logger.info(`ready  http://${host}:${port}`);
});
