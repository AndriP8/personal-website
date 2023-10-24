import { render } from '@testing-library/react';

import BlogDetail from './BlogDetail';

describe('BlogDetail', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <BlogDetail
        blog={{
          id: '',
          title: '',
          slug: '',
          thumbnail: '',
          content: '',
          timeToRead: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        }}
      />
    );
    expect(baseElement).toBeTruthy();
  });
});
