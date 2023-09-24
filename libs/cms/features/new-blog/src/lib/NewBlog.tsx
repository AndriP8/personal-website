import { Box, Button, Flex, FormLabel, Heading, Input } from '@chakra-ui/react';
import { $generateHtmlFromNodes } from '@lexical/html';
import { Editor } from '@personal-website/cms/component';
import { EditorState, LexicalEditor } from 'lexical';
import React from 'react';

export function NewBlog() {
  const [title, setTitle] = React.useState('');
  const [slug, setSlug] = React.useState('');
  const [content, setContent] = React.useState('');
  const onChangeEditor = (_editorState: EditorState, editor: LexicalEditor) => {
    editor.update(() => {
      const raw = $generateHtmlFromNodes(editor, null);
      setContent(raw);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({
      title,
      slug,
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
