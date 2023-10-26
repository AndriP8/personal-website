import { hash } from 'bcryptjs';
import { Express } from 'express';
import supertest from 'supertest';

import { prismaClient } from './database';

export const createTestUser = async () => {
  const password = await hash('test123', 5);

  return prismaClient.user.create({
    data: {
      email: 'test@gmail.com',
      password: password,
    },
  });
};

export const removeTestUser = () => {
  return prismaClient.user.delete({
    where: {
      email: 'test@gmail.com',
    },
  });
};

export const loginTestUser = (app: Express) => {
  return supertest(app)
    .post('/api/users/login')
    .set('Content-Type', 'application/json')
    .send({
      email: 'test@gmail.com',
      password: 'test123',
    });
};

export const createTestThumbnailBlog = () => {
  return prismaClient.thumbnail.create({
    data: {
      resource: 'resource thumbnail',
      owner: 'owner thumbnail',
      ownerLink: 'http://localhost:3000',
    },
  });
};

export const getTestThumbnailBlog = () => {
  return prismaClient.thumbnail.findFirst({
    where: {
      resource: 'resource thumbnail',
    },
  });
};

export const createTesBlog = async (authorId: string) => {
  const thumbnail = await createTestThumbnailBlog();
  return prismaClient.blog.create({
    data: {
      title: 'test title',
      slug: 'test slug',
      thumbnailId: thumbnail.id,
      content: '<p>test content</p>',
      timeToRead: 4,
      authorId: authorId,
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

export const getTestBlog = () => {
  return prismaClient.blog.findFirst({
    where: {
      title: 'test title',
    },
  });
};

export const removeTestThumbnailAndBlog = async () => {
  const thumbnail = await getTestThumbnailBlog();
  // NOTE: for delete blog, should delete thumbnail first, and that is automatically delete blog(Cascade)
  return prismaClient.thumbnail.delete({
    where: {
      id: thumbnail?.id,
    },
    select: {
      id: true,
      resource: true,
      owner: true,
      ownerLink: true,
    },
  });
};
