import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { axios, AxiosError } from '@personal-website/shared/data-access';
import { TokenContext } from '@personal-website/shared/token-context';
import { Blog } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import styled from 'styled-components';

// TODO: Grouping reusable types
type BlogData = Omit<Blog, 'authorId'>;

type BlogProps = {
  data: BlogData[];
  errorMessage: string;
};

const WrapperBlogContent = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

export function Blog(props: BlogProps) {
  const [clickedDeletedData, setClickedDeletedData] =
    React.useState<BlogData | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { token } = React.useContext(TokenContext);

  const handleDelete = () => {
    axios({ token })
      .delete(`/backoffice/blogs/${clickedDeletedData?.id}`, {
        data: {
          id: clickedDeletedData?.id,
        },
      })
      .then(() =>
        toast({
          title: 'Edit blog successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        })
      )
      .catch((error: unknown) => {
        if (error instanceof AxiosError) {
          toast({
            title: 'Edit blog error',
            description: error.response?.data.errors,
            status: 'error',
            duration: 3000,
            isClosable: true,
            position: 'top-right',
          });
        }
      })
      .finally(onClose);
  };
  return props.errorMessage ? (
    <Center marginTop={28}>
      <Heading>{props.errorMessage}</Heading>
    </Center>
  ) : (
    <Box>
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
                <Flex alignItems="center" gap={2} marginTop={2}>
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
                  <Button
                    padding={0}
                    fontSize={14}
                    color="red.500"
                    _hover={{ backgroundColor: 'transparent' }}
                    onClick={() => {
                      onOpen();
                      setClickedDeletedData(data);
                    }}
                  >
                    Delete
                  </Button>
                  <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                      <ModalHeader>Delete Blog</ModalHeader>
                      <ModalCloseButton />
                      <ModalBody>
                        <Text>
                          Are you sure to delete: {clickedDeletedData?.title}
                        </Text>
                      </ModalBody>
                      <ModalFooter>
                        <Flex gap={2}>
                          <Button
                            backgroundColor="gray.400"
                            color="white"
                            _hover={{ backgroundColor: 'gray.500' }}
                            onClick={onClose}
                          >
                            Close
                          </Button>
                          <Button
                            backgroundColor="red.500"
                            color="white"
                            _hover={{ backgroundColor: 'red.600' }}
                            onClick={handleDelete}
                          >
                            Delete
                          </Button>
                        </Flex>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </Flex>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
    </Box>
  );
}

export default Blog;
