import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Main from '../main';

test('Test Login', () => {
  render(<Main />);
  expect(screen.getByPlaceholderText(/Username/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/)).toBeInTheDocument();
});

test('Test Signup', async () => {
  render(<Main />);
  userEvent.click(screen.getByText(/Sign Up/));
  expect(screen.getByPlaceholderText(/First Name/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Last Name/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Username/)).toBeInTheDocument();
  screen.getAllByPlaceholderText(/Password/).forEach(x => expect(x).toBeInTheDocument());
});