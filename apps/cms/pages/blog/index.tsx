import { Layout } from '@personal-website/cms/component';
import { Blog } from '@personal-website/cms/features/blog';
import { axios, AxiosError } from '@personal-website/shared/data-access';
import { TokenContext } from '@personal-website/shared/token-context';
import { Blog as BlogType } from '@prisma/client';
import React from 'react';

const BlogPage = () => {
  const [blogData, setBlogData] = React.useState<BlogType[] | []>([]);
  const [errorMessage, setErrorMessage] = React.useState('');

  const { token } = React.useContext(TokenContext);

  React.useEffect(() => {
    axios({
      token,
    })
      .get('/backoffice/blogs')
      .then((res) => setBlogData(res.data.data))
      .catch((error: unknown) => {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data.message);
        }
      });
  }, [token]);

  return (
    <Layout>
      <Blog data={blogData} errorMessage={errorMessage} />
    </Layout>
  );
};

export default BlogPage;
