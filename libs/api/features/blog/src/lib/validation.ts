import Joi from 'joi';

const createBlogValidation = Joi.object({
  title: Joi.string().max(100).required(),
  slug: Joi.string().max(100).required(),
  thumbnailId: Joi.string().required(),
  content: Joi.string().required(),
  timeToRead: Joi.number().required(),
});

const updateBlogValidation = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().max(100).required(),
  slug: Joi.string().max(100).required(),
  thumbnail: Joi.object({
    id: Joi.string().required(),
    resource: Joi.string().max(100).optional(),
    owner: Joi.string().max(100).required(),
    ownerLink: Joi.string().max(100).required(),
  }),
  content: Joi.string().required(),
  timeToRead: Joi.number().required(),
});

const deleteBlogValidation = Joi.object({
  id: Joi.string().required(),
  thumbnailId: Joi.string().required(),
});

const createThumbnailBlog = Joi.object({
  resource: Joi.string().max(100).required(),
  owner: Joi.string().max(100).required(),
  ownerLink: Joi.string().max(100).required(),
});

export {
  createBlogValidation,
  createThumbnailBlog,
  deleteBlogValidation,
  updateBlogValidation,
};
