import { axios } from '@personal-website/shared/data-access';
import { BlogData } from '@personal-website/shared/types';
import { Home } from '@personal-website/web-app/features/home';
import React from 'react';

type BlogResponse = {
  data: BlogData[];
};

export const getServerSideProps = async () => {
  const res = await axios().get<BlogResponse>('/blogs?size=3');
  return { props: { blogs: res.data.data } };
};

export function Index({ blogs }: { blogs: BlogData[] }) {
  return <Home blogs={blogs} />;
}

export default Index;
