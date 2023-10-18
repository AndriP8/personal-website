import { render } from '@testing-library/react';

import Sidebar from './Sidebar';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));
describe('Sidebar', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Sidebar />);
    expect(baseElement).toBeTruthy();
  });
});
