import {
  prismaClient,
  ResponseError,
  validate,
} from '@personal-website/api/shared/helper';
import { Request } from 'express';

import {
  createBlogValidation,
  deleteBlogValidation,
  updateBlogValidation,
} from './validation';

const createBlogService = async (req: Request) => {
  const data = validate(createBlogValidation, req);
  const countBlog = await prismaClient.blog.count({
    where: {
      title: data.title,
    },
  });

  if (countBlog === 1) {
    throw new ResponseError(
      400,
      `Blog with title '${data.title}'  already exist`
    );
  }

  return prismaClient.blog.create({
    data,
    select: {
      id: true,
      title: true,
      slug: true,
      thumbnail: true,
      content: true,
      timeToRead: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

const getBlogService = (req: Request) => {
  if (req.query.id) {
    return prismaClient.blog.findFirst({
      where: {
        id: req.query.id as string,
      },
    });
  }
  // TODO: implement pagination
  return prismaClient.blog.findMany({
    orderBy: {
      title: 'asc',
    },
  });
};

const updateBlogService = async (req: Request) => {
  const data = validate(updateBlogValidation, req);
  const countBlog = await prismaClient.blog.count({
    where: {
      id: data.id,
    },
  });

  if (countBlog === 1) {
    return prismaClient.blog.update({
      where: {
        id: data.id,
      },
      data,
    });
  } else {
    throw new ResponseError(400, 'Blog is not found');
  }
};

const deleteBlogService = async (req: Request) => {
  const data = validate(deleteBlogValidation, req);
  const countBlog = await prismaClient.blog.count({
    where: {
      id: data.id,
    },
  });

  if (countBlog === 1) {
    return prismaClient.blog.delete({
      where: {
        id: data.id,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        thumbnail: true,
        content: true,
        timeToRead: true,
      },
    });
  } else {
    throw new ResponseError(400, 'Blog is not found');
  }
};

export {
  createBlogService,
  deleteBlogService,
  getBlogService,
  updateBlogService,
};
