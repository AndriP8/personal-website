import { render } from '@testing-library/react';

import Navbar from './Navbar';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

describe('Navbar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Navbar />);
    expect(baseElement).toBeTruthy();
  });
});
