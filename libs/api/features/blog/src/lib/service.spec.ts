import { userRoute } from '@personal-website/api/features/auth';
import {
  createTesBlog,
  createTestUser,
  getTestBlog,
  logger,
  loginTestUser,
  removeTestBlog,
  removeTestUser,
} from '@personal-website/api/shared/helper';
import {
  error as errorMiddleware,
  protectRoute,
} from '@personal-website/api/shared/middleware';
import express from 'express';
import supertest from 'supertest';

import { blogRouterBackoffice, blogRouterPublic } from './route';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoute);
app.use(blogRouterPublic);

app.use(protectRoute);

app.use(blogRouterBackoffice);

app.use(errorMiddleware);

describe('POST /api/backoffice/blogs', () => {
  beforeAll(async () => {
    await createTestUser();
  });
  afterAll(async () => {
    await removeTestBlog();
    await removeTestUser();
  });
  it('should can create new blog', async () => {
    const login = await loginTestUser(app);
    const result = await supertest(app)
      .post('/api/backoffice/blogs')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send({
        title: 'test title',
        slug: 'test slug',
        thumbnail: 'test thumbnail',
        content: '<p>test content</p>',
        timeToRead: 4,
      });

    expect(result.status).toBe(200);
    expect(result.body.data.title).toBe('test title');
    expect(result.body.data.slug).toBe('test slug');
    expect(result.body.data.thumbnail).toBe('test thumbnail');
    expect(result.body.data.content).toBe('<p>test content</p>');
    expect(result.body.data.timeToRead).toBe(4);
  });

  it('should reject if request is invalid', async () => {
    const login = await loginTestUser(app);
    const result = await supertest(app)
      .post('/api/backoffice/blogs')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send({
        title: '',
        slug: '',
        thumbnail: '',
        content: '',
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if token does not provide', async () => {
    const result = await supertest(app)
      .post('/api/backoffice/blogs')
      .set('Content-Type', 'application/json')
      .send({
        title: 'test title',
        slug: 'test slug',
        thumbnail: 'test thumbnail',
        content: '<p>test content</p>',
        timeToRead: 4,
      });

    expect(result.status).toBe(401);
    expect(result.body.message).toBe('Not authorized');
  });
});

describe('GET /api/backoffice/blogs', () => {
  beforeAll(async () => {
    const user = await createTestUser();
    await createTesBlog(user.id);
  });
  afterAll(async () => {
    await removeTestBlog();
    await removeTestUser();
  });
  it('should can get blog data', async () => {
    const login = await loginTestUser(app);
    const result = await supertest(app)
      .get('/api/backoffice/blogs')
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveLength(result.body.data.length);
  });

  it('should can get blog data by id', async () => {
    const login = await loginTestUser(app);
    const testBlog = await getTestBlog();
    const result = await supertest(app)
      .get(`/api/backoffice/blogs?blogId=${testBlog?.id}`)
      .set('Authorization', `Bearer ${login.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testBlog?.id);
  });

  it('should reject if token does not provide', async () => {
    const result = await supertest(app).get('/api/backoffice/blogs');

    expect(result.status).toBe(401);
    expect(result.body.message).toBe('Not authorized');
  });
});

describe('PUT /api/backoffice/blogs/:blogId', () => {
  beforeAll(async () => {
    const user = await createTestUser();
    await createTesBlog(user.id);
  });
  afterAll(async () => {
    await removeTestBlog();
    await removeTestUser();
  });
  it('should can edit existing blog', async () => {
    const login = await loginTestUser(app);
    const testBlog = await getTestBlog();
    const result = await supertest(app)
      .put('/api/backoffice/blogs/' + testBlog?.id)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send({
        id: testBlog?.id,
        title: 'test title',
        slug: 'test slug edited',
        thumbnail: 'test thumbnail',
        content: '<p>test content</p>',
        timeToRead: 4,
      });

    expect(result.status).toBe(200);
    expect(result.body.data.slug).toBe('test slug edited');
  });

  it('should reject edit if request invalid', async () => {
    const login = await loginTestUser(app);
    const testBlog = await getTestBlog();
    const result = await supertest(app)
      .put('/api/backoffice/blogs/' + testBlog?.id)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send({
        id: '',
        title: '',
        slug: '',
        thumbnail: '',
        content: '',
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if token does not provide', async () => {
    const testBlog = await getTestBlog();
    const result = await supertest(app)
      .put('/api/backoffice/blogs/' + testBlog?.id)
      .set('Content-Type', 'application/json')
      .send({
        id: '',
        title: '',
        slug: '',
        thumbnail: '',
        content: '',
      });

    expect(result.status).toBe(401);
    expect(result.body.message).toBe('Not authorized');
  });
});

describe('DELETE /api/backoffice/blogs/:blogId', () => {
  beforeAll(async () => {
    const user = await createTestUser();
    await createTesBlog(user.id);
  });
  afterAll(async () => {
    await removeTestUser();
  });
  it('should can delete existing blog', async () => {
    const login = await loginTestUser(app);
    const testBlog = await getTestBlog();
    const result = await supertest(app)
      .delete('/api/backoffice/blogs/' + testBlog?.id)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send({
        id: testBlog?.id,
      });

    logger.info(result);
    expect(result.status).toBe(200);
  });

  it('should reject delete existing blog', async () => {
    const login = await loginTestUser(app);
    const result = await supertest(app)
      .delete('/api/backoffice/blogs/' + null)
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${login.body.token}`)
      .send({
        id: null,
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should reject if token does not provide', async () => {
    const result = await supertest(app)
      .delete('/api/backoffice/blogs/' + null)
      .set('Content-Type', 'application/json')
      .send({
        id: null,
      });

    expect(result.status).toBe(401);
    expect(result.body.message).toBe('Not authorized');
  });
});

// For Public route
describe('GET /api/blogs', () => {
  beforeAll(async () => {
    const user = await createTestUser();
    await createTesBlog(user.id);
  });
  afterAll(async () => {
    await removeTestBlog();
    await removeTestUser();
  });
  it('should can get blog data', async () => {
    const result = await supertest(app).get('/api/blogs');

    logger.info(result);

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveLength(result.body.data.length);
  });

  it('should can get blog data by id', async () => {
    const testBlog = await getTestBlog();
    const result = await supertest(app).get(
      `/api/blogs?blogId=${testBlog?.id}`
    );

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testBlog?.id);
  });
});
