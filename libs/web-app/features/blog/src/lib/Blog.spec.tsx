import { render } from '@testing-library/react';

import Blog from './Blog';

describe('Blog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Blog blogs={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
