import Joi from 'joi';

const createBlogValidation = Joi.object({
  title: Joi.string().max(100).required(),
  slug: Joi.string().max(100).required(),
  thumbnail: Joi.string().max(100).required(),
  content: Joi.string().required(),
  timeToRead: Joi.number().required(),
});

const updateBlogValidation = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().max(100).required(),
  slug: Joi.string().max(100).required(),
  thumbnail: Joi.string().max(100).required(),
  content: Joi.string().required(),
  timeToRead: Joi.number().required(),
});

const deleteBlogValidation = Joi.object({
  id: Joi.string().required(),
});

export { createBlogValidation, deleteBlogValidation, updateBlogValidation };
