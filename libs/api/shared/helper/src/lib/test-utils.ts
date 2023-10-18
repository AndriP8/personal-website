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

const getTestUser = () => {
  return prismaClient.user.findUnique({
    where: {
      email: 'test@gmail.com',
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

export const createTesBlog = (authorId: string) => {
  return prismaClient.blog.create({
    data: {
      title: 'test title',
      slug: 'test slug',
      thumbnail: 'test thumbnail',
      content: '<p>test content</p>',
      timeToRead: 4,
      authorId,
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

export const removeTestBlog = () => {
  return prismaClient.blog.delete({
    where: {
      title: 'test title',
    },
  });
};
