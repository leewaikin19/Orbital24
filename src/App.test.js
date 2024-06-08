// TODO edit later

import { render, screen } from '@testing-library/react';
import { } from '@testing-library/jest-dom';

import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/len react/i);
  expect(linkElement).toBeInTheDocument();
});
