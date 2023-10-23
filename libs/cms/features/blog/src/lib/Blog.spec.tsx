import { render } from '@testing-library/react';

import { Blog } from './Blog';

const dummyData = [
  {
    id: '123',
    title:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    slug: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod',
    content:
      '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>',
    thumbnail: '/asd',
    createdAt: new Date(),
    updatedAt: new Date(),
    timeToRead: 180,
  },
];

describe('Blog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Blog data={dummyData} errorMessage={''} />);
    expect(baseElement).toBeTruthy();
  });
});
