import { Blog, Thumbnail } from '@prisma/client';

export type BlogData = Omit<Blog, 'autohrId' | 'thumbnailId'> & {
  thumbnail: Thumbnail;
};
