import { Box, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { BlogData } from '@personal-website/web-app/components';
import Image from 'next/image';

type BlogDetailProps = {
  blog: BlogData;
};

// TODO: move to reusable value
const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

export function BlogDetail({ blog }: BlogDetailProps) {
  return (
    <VStack alignItems="start" rowGap={6}>
      <VStack alignItems="start" rowGap={2}>
        <Heading
          as="h1"
          fontWeight="medium"
          fontSize={{ base: 32, md: 38, lg: 42 }}
        >
          {blog.title}
        </Heading>
        <HStack color="gray.600">
          <Text>
            {new Date(blog.createdAt).toLocaleDateString('id', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
          <Box
            borderRadius="full"
            width={1}
            height={1}
            backgroundColor="black"
            marginBlock="auto"
          />
          <Text>{blog.timeToRead} min read</Text>
        </HStack>
      </VStack>
      {/* TODO: adding thumbnail resource */}
      <Box
        height={{ base: '400px', md: '450px' }}
        width={{ base: '100%', md: '90%', lg: '80%' }}
        position="relative"
        marginInline="auto"
      >
        <Image
          src={`${cloudinaryUrl}${blog.thumbnail}`}
          alt=""
          style={{
            width: '100%',
            objectFit: 'cover',
            borderRadius: 8,
          }}
          fill
          sizes="450,(min-width: 48em) 400"
          priority
        />
      </Box>
      <Box marginTop={8} width="full">
        <Box dangerouslySetInnerHTML={{ __html: blog.content }} />
      </Box>
    </VStack>
  );
}

export default BlogDetail;
