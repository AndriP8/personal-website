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
  return prismaClient.user.deleteMany({
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
