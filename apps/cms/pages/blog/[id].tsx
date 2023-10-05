import { Layout } from '@personal-website/cms/component';
import { EditBlog } from '@personal-website/cms/features/edit-blog';
import { Blog } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/router';
import React from 'react';

const EditBlogPage = () => {
  const [blogDetail, setBlogDetail] = React.useState<Blog | null>(null);

  const router = useRouter();

  React.useEffect(() => {
    if (router.query.id)
      axios
        .get(`http://localhost:3000/api/blogs?id=${router.query.id}`)
        .then((res) => setBlogDetail(res.data.data));
  }, [router.query?.id]);

  return (
    <Layout>
      <EditBlog data={blogDetail} />
    </Layout>
  );
};

export default EditBlogPage;
