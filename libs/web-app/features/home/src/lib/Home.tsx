import { Box, Heading, HStack, Text } from '@chakra-ui/react';
import { BlogCard, BlogData } from '@personal-website/web-app/components';
import Link from 'next/link';

type HomeProps = {
  blogs: BlogData[];
};

export function Home({ blogs }: HomeProps) {
  return (
    <>
      <Box>
        <Box color="black">
          <Heading as="h1" fontSize={32} fontWeight="normal" lineHeight={2}>
            Hi, Im Andri Purnomo
          </Heading>
          <Text>
            Someone who is very interested in frontend development since late
            2020. I am currently working as Frontend Engineer, my main tech
            stack is React and Typescript, but I also learned other things like
            Chakra UI, Mantine as a UI library, Xstate as a Finite state
            machine, and Advanced React pattern. Now I am curious about how to
            maintain an extensive website because for that I am interested learn
            about performance
          </Text>
        </Box>
      </Box>
      <Box color="black">
        <HStack justifyContent="space-between">
          <Heading as="h2" fontWeight="light" marginBottom={5}>
            Latest Blogs
          </Heading>
          <Link href="/blog" style={{ textDecoration: 'underline' }}>
            See all
          </Link>
        </HStack>
        <BlogCard blogs={blogs} />
      </Box>
    </>
  );
}

export default Home;
