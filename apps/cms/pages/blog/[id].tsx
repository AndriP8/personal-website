import { Layout } from '@personal-website/cms/component';
import { EditBlog } from '@personal-website/cms/features/edit-blog';
import { axios, AxiosError } from '@personal-website/shared/data-access';
import { TokenContext } from '@personal-website/shared/token-context';
import { Blog } from '@prisma/client';
import { useRouter } from 'next/router';
import React from 'react';

const EditBlogPage = () => {
  const [blogDetail, setBlogDetail] = React.useState<Blog | null>(null);
  const [errorMessage, setErrorMessage] = React.useState('');

  const router = useRouter();
  const { token } = React.useContext(TokenContext);

  React.useEffect(() => {
    if (router.query.id)
      axios({ token })
        .get(`/backoffice/blogs?blogId=${router.query.id}`)
        .then((res) => setBlogDetail(res.data.data))
        .catch((error: unknown) => {
          if (error instanceof AxiosError) {
            setErrorMessage(error.response?.data.message);
          }
        });
  }, [router.query.id, token]);

  return (
    <Layout>
      <EditBlog data={blogDetail} errorMessage={errorMessage} />
    </Layout>
  );
};

export default EditBlogPage;
