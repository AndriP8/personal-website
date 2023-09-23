import { Layout } from '@personal-website/cms/component';
import { Blog } from '@personal-website/cms/features/blog';

const dummyData = [
  {
    id: 123,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    slug: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    content:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
    createdAt: 'Sep 21, 2023',
    timeToRead: 180,
  },
  {
    id: 124,
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    slug: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    content:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>',
    createdAt: 'Sep 21, 2023',
    timeToRead: 180,
  },
];

const BlogPage = () => {
  return (
    <Layout>
      <Blog data={dummyData} />
    </Layout>
  );
};

export default BlogPage;
