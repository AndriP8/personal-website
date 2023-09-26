import {
  Box,
  Button,
  Flex,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { $generateHtmlFromNodes } from '@lexical/html';
import { Editor } from '@personal-website/cms/component';
import axios from 'axios';
import { EditorState, LexicalEditor } from 'lexical';
import Image from 'next/image';
import React from 'react';

export function NewBlog() {
  const [title, setTitle] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [content, setContent] = React.useState('');
  const [thumbnail, setThumbnail] = React.useState('');

  const toast = useToast();

  const onChangeEditor = (_editorState: EditorState, editor: LexicalEditor) => {
    editor.update(() => {
      const raw = $generateHtmlFromNodes(editor, null);
      setContent(raw);
    });
  };

  const onChangeUpload = (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append(
      'upload_preset',
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || ''
    );

    axios
      .post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      )
      .then((response) => {
        setThumbnail(response.data.url);
        toast({
          title: 'Upload image has been successfully',
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      })
      .catch((error) => {
        toast({
          title: 'Upload image has an error',
          description: error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top-right',
        });
      });
  };

  const parseCLoudinaryUrl = () => {
    let splittedUrl = '';
    const url = thumbnail;
    const splitUrl = url.split('/');
    for (let i = 0; i < splitUrl.length; i++) {
      if (i > 5) {
        splittedUrl += `/${splitUrl[i]}`;
      }
    }
    return splittedUrl;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      title,
      slug,
      thumbnail: parseCLoudinaryUrl(),
      content,
    });
  };

  return (
    <>
      <Box
        borderBottom={1}
        borderStyle="solid"
        borderColor="gray.400"
        paddingBlock={4}
        marginBottom={6}
      >
        <Heading>New Blog</Heading>
      </Box>
      <Box>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap={3}>
            <Box>
              <FormLabel fontSize={20} htmlFor="title">
                Title
              </FormLabel>
              <Input
                id="title"
                name="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                borderColor="gray.300"
              />
            </Box>
            <Box>
              <FormLabel fontSize={20} htmlFor="slug">
                Slug
              </FormLabel>
              <Input
                id="slug"
                name="slug"
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                borderColor="gray.300"
              />
            </Box>
            <Box>
              <FormLabel fontSize={20} htmlFor="slug">
                Thumbnail
              </FormLabel>
              <Box
                border={1}
                borderStyle="solid"
                borderColor="gray.400"
                borderRadius={6}
                maxWidth={350}
                padding={2}
                position="relative"
              >
                {thumbnail ? (
                  <Image
                    src={thumbnail}
                    width={350}
                    height={450}
                    priority
                    alt="thumbnail-image"
                    style={{
                      objectFit: 'cover',
                      height: 450,
                      marginBottom: 12,
                      borderRadius: 6,
                    }}
                  />
                ) : null}
                <Box height={10} position="relative">
                  {/* TODO: handling files and size validation */}
                  <Input
                    type="file"
                    onChange={(e) =>
                      e.target.files ? onChangeUpload(e.target.files[0]) : null
                    }
                    opacity={0}
                    cursor="pointer"
                    zIndex={1}
                  />
                  <Button
                    width="full"
                    border={1}
                    borderColor="gray.400"
                    borderStyle="solid"
                    position="absolute"
                    top={0}
                    left={0}
                  >
                    Choose image
                  </Button>
                </Box>
                <Text color="gray.600" fontSize={14}>
                  Allowed file extensions: .JPG .JPEG .PNG
                </Text>
                <Text color="gray.600" fontSize={14}>
                  Maximum file is 5Mb
                </Text>
              </Box>
            </Box>
            <Box>
              <FormLabel fontSize={20} htmlFor="slug">
                Content
              </FormLabel>
              <Editor onChange={onChangeEditor} />
            </Box>
            <Button
              type="submit"
              backgroundColor="gray.400"
              color="white"
              _hover={{ backgroundColor: 'gray.500' }}
            >
              Save
            </Button>
          </Flex>
        </form>
      </Box>
    </>
  );
}

export default NewBlog;
