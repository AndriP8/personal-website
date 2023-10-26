import { Blog, Thumbnail } from '@prisma/client';

export type BlogData = Omit<Blog, 'authorId' | 'thumbnailId'> & {
  thumbnail: Thumbnail;
};
