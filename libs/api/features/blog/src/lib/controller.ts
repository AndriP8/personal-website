import { NextFunction, Request, Response } from 'express';

import {
  createBlogService,
  deleteBlogService,
  getBlogService,
  updateBlogService,
} from './service';

const createBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = req.body;
    const result = await createBlogService(request);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const getBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getBlogService();
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const updateBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = req.body;
    req.body.id = req.params.blogId;
    const result = await updateBlogService(request);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const deleteBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const request = req.body;
    req.body.id = req.params.blogId;
    const result = await deleteBlogService(request);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

export {
  createBlogController,
  deleteBlogController,
  getBlogController,
  updateBlogController,
};
