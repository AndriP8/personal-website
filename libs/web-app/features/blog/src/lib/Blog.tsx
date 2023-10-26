import { Box, Heading } from '@chakra-ui/react';
import { BlogData } from '@personal-website/shared/types';
import { BlogCard } from '@personal-website/web-app/components';

type BlogProps = {
  blogs: BlogData[];
};

export function Blog({ blogs }: BlogProps) {
  return (
    <Box>
      <Heading as="h2" fontWeight="light" marginBottom={5}>
        All Blogs
      </Heading>
      <BlogCard blogs={blogs} />
    </Box>
  );
}

export default Blog;
