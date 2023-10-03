import { Layout } from '@personal-website/cms/component';
import { Blog, Data } from '@personal-website/cms/features/blog';
import axios from 'axios';
import React from 'react';

const BlogPage = () => {
  const [blogData, setBlogData] = React.useState<Data[] | []>([]);

  React.useEffect(() => {
    axios
      .get('http://localhost:3000/api/blogs')
      .then((res) => setBlogData(res.data.data));
  }, []);

  return (
    <Layout>
      <Blog data={blogData} />
    </Layout>
  );
};

export default BlogPage;
