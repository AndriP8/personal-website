import { error as errorMiddleware } from '@personal-website/api/shared/middleware';
import express from 'express';

import { logger } from './app/logging';
import { router } from './app/route';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errorMiddleware);

app.listen(port, host, () => {
  logger.info(`ready  http://${host}:${port}`);
});
