import express, { Router } from 'express';

import {
  createBlogController,
  deleteBlogController,
  getBlogController,
  getPublicBlogController,
  updateBlogController,
} from './controller';

export const blogRouterBackoffice = express.Router() as Router;
blogRouterBackoffice.post('/api/backoffice/blogs', (req, res, next) => {
  createBlogController(req, res, next);
});

blogRouterBackoffice.get('/api/backoffice/blogs', (req, res, next) => {
  getBlogController(req, res, next);
});

blogRouterBackoffice.put('/api/backoffice/blogs/:blogId', (req, res, next) => {
  updateBlogController(req, res, next);
});

blogRouterBackoffice.delete(
  '/api/backoffice/blogs/:blogId',
  (req, res, next) => {
    deleteBlogController(req, res, next);
  }
);

export const blogRouterPublic = express.Router() as Router;
blogRouterPublic.get('/api/blogs', (req, res, next) => {
  getPublicBlogController(req, res, next);
});
