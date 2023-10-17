import {
  createTestUser,
  removeTestUser,
} from '@personal-website/api/shared/helper';
import { error as errorMiddleware } from '@personal-website/api/shared/middleware';
import express from 'express';
import supertest from 'supertest';

import { userRoute } from './route';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoute);

app.use(errorMiddleware);

describe('POST /api/users', () => {
  afterEach(async () => {
    await removeTestUser();
  });
  afterAll(async () => {
    await removeTestUser();
  });

  it('should can create new user', async () => {
    const result = await supertest(app)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send({
        email: 'test@gmail.com',
        password: 'test123',
      });

    expect(result.status).toBe(200);
    expect(result.body).not.toHaveProperty('password');
  });

  it('should reject if email is invalid', async () => {
    const result = await supertest(app)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send({
        email: 'testadgmail.com',
        password: 'test123',
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBe('Email is not valid');
  });
  it('should reject if password is invalid', async () => {
    const result = await supertest(app)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send({
        email: 'test@gmail.com',
        password: 'test',
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBe('Password must contain min 6 character');
  });
  it('should reject if email and password is empty', async () => {
    const result = await supertest(app)
      .post('/api/users')
      .set('Content-Type', 'application/json')
      .send({
        email: '',
        password: '',
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBe(
      '"email" is not allowed to be empty. "password" is not allowed to be empty'
    );
  });
});

describe('POST /api/users/login', () => {
  it('should can login with existing user', async () => {
    await createTestUser();
    const result = await supertest(app)
      .post('/api/users/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'test@gmail.com',
        password: 'test123',
      });

    expect(result.status).toBe(200);
    expect(result.body.token).toBeDefined();
    await removeTestUser();
  });
  it('should reject if email and password is invalid', async () => {
    const result = await supertest(app)
      .post('/api/users/login')
      .set('Content-Type', 'application/json')
      .send({
        email: 'testwrong@gmail.com',
        password: 'testwrong',
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBe('Username or Password is invalid');
  });
});
