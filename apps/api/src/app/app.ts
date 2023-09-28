import exppress from 'express';

import { blogRouter } from './route';

export const buildApp = () => {
  const app = exppress();

  app.use(blogRouter);
  return app;
};
