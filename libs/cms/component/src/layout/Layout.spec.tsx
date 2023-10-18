import { render } from '@testing-library/react';

import Layout from './Layout';
jest.mock('next/router', () => jest.requireActual('next-router-mock'));
describe('Layout', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Layout />);
    expect(baseElement).toBeTruthy();
  });
});
