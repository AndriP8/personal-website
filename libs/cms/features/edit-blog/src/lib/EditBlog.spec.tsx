import { render } from '@testing-library/react';

import EditBlog from './EditBlog';

describe('EditBlog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<EditBlog />);
    expect(baseElement).toBeTruthy();
  });
});
