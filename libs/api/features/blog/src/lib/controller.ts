import { splitBearer } from '@personal-website/api/shared/helper';
import { NextFunction, Request, Response } from 'express';

import {
  createBlogService,
  deleteBlogService,
  getBlogService,
  getPublicBlogService,
  updateBlogService,
} from './service';

const createBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user, ...request } = req.body;
    const token = splitBearer(req.headers.authorization ?? '');
    const result = token ? await createBlogService(request, token) : null;
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
    const token = splitBearer(req.headers.authorization ?? '');
    const result = await getBlogService(req, token);
    res.status(200).json({ data: result });
  } catch (e) {
    next(e);
  }
};

const getPublicBlogController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await getPublicBlogService(req);
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
    const { user, ...request } = req.body;
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
    const { user, ...request } = req.body;
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
  getPublicBlogController,
  updateBlogController,
};
