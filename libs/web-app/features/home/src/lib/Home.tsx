import { Box, Card, Heading, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { Blog as PrismaBlog } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

import styles from './Home.module.css';

export type BlogData = Omit<PrismaBlog, 'authorId'>;

export interface HomeProps {
  blogs: BlogData[];
}

const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

export function Home(props: HomeProps) {
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
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
          {props.blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blog/${blog.id}`}
              className={styles['wrapper-blog-link']}
            >
              <Card backgroundColor="gray.200" boxShadow="none" padding={2}>
                <Image
                  src={`${cloudinaryUrl}${blog.thumbnail}`}
                  alt=""
                  sizes="100vw"
                  style={{
                    width: '100%',
                    height: '450px',
                    objectFit: 'cover',
                    borderRadius: 6,
                  }}
                  width={500}
                  height={300}
                  priority
                />
                <SimpleGrid spacing={1} marginBlock={3}>
                  <Text fontSize={18} fontWeight="semibold" color="#9BABB8">
                    {new Date(blog.createdAt).toLocaleDateString('id', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}{' '}
                    - {blog.timeToRead} min read
                  </Text>
                  <Text
                    fontSize={24}
                    fontWeight="semibold"
                    color="black"
                    className="title-blog"
                  >
                    {blog.title}
                  </Text>
                </SimpleGrid>
              </Card>
            </Link>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default Home;
