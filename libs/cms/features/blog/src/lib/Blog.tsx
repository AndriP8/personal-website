import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { Blog } from '@prisma/client';
import Link from 'next/link';
import styled from 'styled-components';

type BlogProps = {
  data: Blog[];
};

const WrapperBlogContent = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export function Blog(props: BlogProps) {
  return (
    <>
      <Flex
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.400"
        paddingBlock={4}
        marginBottom={6}
        justifyContent="space-between"
        alignItems="center"
      >
        <Heading>List Blog</Heading>
        <Button
          backgroundColor="gray.400"
          color="white"
          _hover={{ backgroundColor: 'gray.500' }}
        >
          <Link href="blog/new">New Blog</Link>
        </Button>
      </Flex>
      <Box>
        <SimpleGrid gap={6}>
          {props.data?.map((data) => {
            return (
              <Box
                key={data.id}
                paddingBottom={6}
                borderBottom={1}
                borderStyle="solid"
                borderColor="gray.300"
              >
                <Heading as="h3" fontSize={18}>
                  {data.title}
                </Heading>
                <WrapperBlogContent
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
                <Flex alignItems="center" gap={4} marginTop={2}>
                  <Flex alignItems="center" gap={2} fontSize={14}>
                    <Text>
                      Published on{' '}
                      <span>
                        {new Intl.DateTimeFormat('id', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        }).format(new Date(data.createdAt))}
                      </span>
                    </Text>
                    <Box
                      borderRadius="full"
                      width={1}
                      height={1}
                      backgroundColor="black"
                      marginBlock="auto"
                    />
                    <Text>{data.timeToRead} min read</Text>
                  </Flex>
                  <Divider
                    height={4}
                    borderColor="gray.700"
                    orientation="vertical"
                  />
                  <Button
                    padding={0}
                    fontSize={14}
                    _hover={{ backgroundColor: 'transparent' }}
                  >
                    <Link href={`blog/${data.id}`}>Edit</Link>
                  </Button>
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default Blog;
