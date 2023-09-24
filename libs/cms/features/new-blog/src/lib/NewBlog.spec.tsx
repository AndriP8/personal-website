import { render } from '@testing-library/react';

import CmsFeaturesNewBlog from './NewBlog';

describe('CmsFeaturesNewBlog', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CmsFeaturesNewBlog />);
    expect(baseElement).toBeTruthy();
  });
});
