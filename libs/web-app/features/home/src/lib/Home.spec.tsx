import { render } from '@testing-library/react';

import WebAppFeaturesHome from './Home';

describe('WebAppFeaturesHome', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<WebAppFeaturesHome blogs={[]} />);
    expect(baseElement).toBeTruthy();
  });
});
