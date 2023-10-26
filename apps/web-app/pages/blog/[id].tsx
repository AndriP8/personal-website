import { axios } from '@personal-website/shared/data-access';
import { BlogData } from '@personal-website/shared/types';
import { BlogDetail } from '@personal-website/web-app/features/blog-detail';
import type { GetServerSidePropsContext } from 'next';

type BlogResponse = {
  data: BlogData;
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const res = await axios().get<BlogResponse>(
    `/blogs?blogId=${context.query.id}`
  );
  return { props: { blog: res.data.data } };
};

export const DetailBlog = ({ blog }: { blog: BlogData }) => {
  return <BlogDetail blog={blog} />;
};

export default DetailBlog;
