import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Main from './main';

test('renders login page', () => {
  render(<Main />);
  expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
});

test('renders signup page', async () => {
  render(<Main />);
  await userEvent.click(screen.getByText(/Sign Up/i));
  expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
  screen.getAllByPlaceholderText(/Password/i).forEach(x => expect(x).toBeInTheDocument());
});

