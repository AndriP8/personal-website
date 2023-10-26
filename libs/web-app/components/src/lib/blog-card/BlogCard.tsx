import { Card, SimpleGrid, Text } from '@chakra-ui/react';
import { BlogData } from '@personal-website/shared/types';
import Image from 'next/image';
import Link from 'next/link';

import styles from './BlogCard.module.css';

type BlogCardProps = {
  blogs: BlogData[];
};

const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

export function BlogCard({ blogs }: BlogCardProps) {
  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          href={`/blog/${blog.id}`}
          className={styles['wrapper-blog-link']}
        >
          <Card backgroundColor="gray.200" boxShadow="none" padding={2}>
            <Image
              src={`${cloudinaryUrl}${blog.thumbnail.resource}`}
              alt=""
              sizes="100vw"
              style={{
                width: '100%',
                height: '450px',
                objectFit: 'cover',
                borderRadius: 8,
              }}
              width={500}
              height={300}
              priority
            />
            <SimpleGrid spacing={1} marginBlock={3}>
              <Text fontSize={18} fontWeight="semibold" color="gray.500">
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
  );
}

export default BlogCard;
