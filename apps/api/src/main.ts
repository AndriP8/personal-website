import { buildApp } from './app/app';
import { logger } from './app/logging';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;
const app = buildApp();

app.listen(port, host, () => {
  logger.info(`ready  http://${host}:${port}`);
});
