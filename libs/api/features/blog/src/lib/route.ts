import express, { Router } from 'express';

import {
  createBlogController,
  deleteBlogController,
  getBlogController,
  updateBlogController,
} from './controller';

export const blogRouter = express.Router() as Router;
blogRouter.post('/api/blogs', (req, res, next) => {
  createBlogController(req, res, next);
});

blogRouter.get('/api/blogs', (req, res, next) => {
  getBlogController(req, res, next);
});

blogRouter.put('/api/blogs/:blogId', (req, res, next) => {
  updateBlogController(req, res, next);
});

blogRouter.delete('/api/blogs/:blogId', (req, res, next) => {
  deleteBlogController(req, res, next);
});
