import { Box, Button, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import { Layout } from '@personal-website/cms/component';
import { MdMoreHoriz } from 'react-icons/md';
import styled from 'styled-components';

const dummyData = [
  {
    id: 123,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    slug: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    content:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
    createdAt: 'Sep 21, 2023',
    timeToRead: 180,
  },
  {
    id: 124,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    slug: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    content:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
    createdAt: 'Sep 21, 2023',
    timeToRead: 180,
  },
];

const WrapperBlogContent = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const Blog = () => {
  return (
    <Layout>
      <Box
        paddingBlock={6}
        paddingInline={20}
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.400"
      >
        <Heading>Blog</Heading>
      </Box>
      <Box paddingBlock={6} paddingInline={20}>
        <SimpleGrid gap={6}>
          {dummyData.map((data) => {
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
                      Published on <span>{data.createdAt}</span>
                    </Text>
                    <Box
                      borderRadius="full"
                      width={1}
                      height={1}
                      backgroundColor="black"
                      marginBlock="auto"
                    />
                    <Text>{data.timeToRead / 60} min read</Text>
                  </Flex>
                  <Button
                    padding={0}
                    minWidth="auto"
                    width="auto"
                    height="auto"
                    _hover={{ backgroundColor: 'none' }}
                  >
                    <MdMoreHoriz />
                  </Button>
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Layout>
  );
};

export default Blog;
