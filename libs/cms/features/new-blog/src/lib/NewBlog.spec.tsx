import { render } from '@testing-library/react';

import NewBlog from './NewBlog';

describe('NewBlog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NewBlog />);
    expect(baseElement).toBeTruthy();
  });
});
