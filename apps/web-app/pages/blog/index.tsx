import { axios } from '@personal-website/shared/data-access';
import { BlogData } from '@personal-website/shared/types';
import { Blog } from '@personal-website/web-app/features/blog';

type BlogResponse = {
  data: BlogData[];
};

export const getServerSideProps = async () => {
  const res = await axios().get<BlogResponse>('/blogs');
  return { props: { blogs: res.data.data } };
};

export function BlogPage({ blogs }: { blogs: BlogData[] }) {
  return <Blog blogs={blogs} />;
}

export default BlogPage;
