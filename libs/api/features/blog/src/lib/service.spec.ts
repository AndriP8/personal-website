import { logger, prismaClient } from '@personal-website/api/shared/helper';
import { error as errorMiddleware } from '@personal-website/api/shared/middleware';
import express from 'express';
import supertest from 'supertest';

import { blogRouter } from './route';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(blogRouter);

app.use(errorMiddleware);

const getTestBlog = () => {
  return prismaClient.blog.findFirst({
    where: {
      title: 'test title',
    },
  });
};

describe('POST /api/blogs', () => {
  it('should can create new blog', async () => {
    const result = await supertest(app)
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
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

    // await prismaClient.blog.delete({
    //   where: {
    //     id: result.body.data.id,
    //   },
    // });
  });

  it('should reject if request is invalid', async () => {
    const result = await supertest(app)
      .post('/api/blogs')
      .set('Content-Type', 'application/json')
      .send({
        title: '',
        slug: '',
        thumbnail: '',
        content: '',
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /api/blogs', () => {
  it('should can get blog data', async () => {
    const result = await supertest(app).get('/api/blogs');

    expect(result.status).toBe(200);
    expect(result.body.data).toHaveLength(result.body.data.length);
  });
});

describe('PUT /api/blogs/:blogId', () => {
  it('should can edit existing blog', async () => {
    const testBlog = await getTestBlog();
    const result = await supertest(app)
      .put('/api/blogs/' + testBlog?.id)
      .set('Content-Type', 'application/json')
      .send({
        title: 'test title',
        slug: 'test slug edited',
        thumbnail: 'test thumbnail',
        content: '<p>test content</p>',
        timeToRead: 4,
      });

    expect(result.status).toBe(200);
    expect(result.body.data.slug).toBe('test slug edited');
  });
});

describe('DELETE /api/blogs/:blogId', () => {
  it('should can delete existing blog', async () => {
    const testBlog = await getTestBlog();
    const result = await supertest(app)
      .delete('/api/blogs/' + testBlog?.id)
      .set('Content-Type', 'application/json')
      .send({
        id: testBlog?.id,
      });
    expect(result.status).toBe(200);
  });

  it('should reject delete existing blog', async () => {
    const result = await supertest(app)
      .delete('/api/blogs/' + null)
      .set('Content-Type', 'application/json')
      .send({
        id: null,
      });

    logger.info(result);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
