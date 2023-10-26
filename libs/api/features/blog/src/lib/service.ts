import {
  decodeToken,
  prismaClient,
  ResponseError,
  validate,
} from '@personal-website/api/shared/helper';
import { Request, Response } from 'express';

import {
  createBlogValidation,
  createThumbnailBlog,
  deleteBlogValidation,
  updateBlogValidation,
} from './validation';

const createBlogService = async (req: Request, token: string) => {
  const data = validate(createBlogValidation, req);
  const payloadToken = await decodeToken(token);
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
    data: {
      ...data,
      authorId: payloadToken.id,
    },
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

const getBlogService = async (req: Request, token: string) => {
  const payloadToken = await decodeToken(token);

  if (req.query.blogId) {
    return prismaClient.blog.findFirst({
      where: {
        id: req.query.blogId as string,
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        content: true,
        timeToRead: true,
        createdAt: true,
        updatedAt: true,
        slug: true,
      },
    });
  }

  if (req.query.size) {
    return prismaClient.blog.findMany({
      take: Number(req.query.size),
      orderBy: {
        createdAt: 'desc',
      },
      where: {
        authorId: payloadToken.id,
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        content: true,
        timeToRead: true,
        createdAt: true,
        updatedAt: true,
        slug: true,
      },
    });
  }
  return prismaClient.blog.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    where: {
      authorId: payloadToken.id,
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      content: true,
      timeToRead: true,
      createdAt: true,
      updatedAt: true,
      slug: true,
    },
  });
};

const getPublicBlogService = async (req: Request) => {
  if (req.query.blogId) {
    return prismaClient.blog.findFirst({
      where: {
        id: req.query.blogId as string,
      },
    });
  }
  if (req.query.size) {
    return prismaClient.blog.findMany({
      take: Number(req.query.size),
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        title: true,
        thumbnail: true,
        content: true,
        timeToRead: true,
        createdAt: true,
        updatedAt: true,
        slug: true,
      },
    });
  }
  return prismaClient.blog.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      title: true,
      thumbnail: true,
      content: true,
      timeToRead: true,
      createdAt: true,
      updatedAt: true,
      slug: true,
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
      data: {
        ...data,
        thumbnail: {
          update: {
            ...data.thumbnail,
          },
        },
      },
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
  } else {
    throw new ResponseError(400, 'Blog is not found');
  }
};

const deleteBlogService = async (req: Request, res: Response) => {
  const data = validate(deleteBlogValidation, req);
  const countBlog = await prismaClient.blog.count({
    where: {
      id: data.id,
      thumbnailId: data.thumbnailId,
    },
  });

  if (countBlog === 1 && data.thumbnailId) {
    await prismaClient.thumbnail.delete({
      where: {
        id: data.thumbnailId,
      },
      select: {
        id: true,
        resource: true,
        owner: true,
        ownerLink: true,
      },
    });
    return res.status(200).json({ data: 'Ok' });
  } else {
    throw new ResponseError(400, 'Blog is not found');
  }
};

const createThumbnailBlogService = async (req: Request) => {
  const data = validate(createThumbnailBlog, req);
  const countThumbnailBlog = await prismaClient.thumbnail.count({
    where: {
      resource: data.resource,
    },
  });

  if (countThumbnailBlog === 1) {
    throw new ResponseError(400, `Thumbnail '${data.resource}'  already exist`);
  }

  return prismaClient.thumbnail.create({
    data: {
      ...data,
    },
    select: {
      id: true,
      resource: true,
      owner: true,
      ownerLink: true,
    },
  });
};

export {
  createBlogService,
  createThumbnailBlogService,
  deleteBlogService,
  getBlogService,
  getPublicBlogService,
  updateBlogService,
};
