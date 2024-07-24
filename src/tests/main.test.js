import { render, screen, fireEvent } from '@testing-library/react';
//import userEvent from '@testing-library/user-event';
import Main from '../main';
import {Login, Signup} from '../main';

test('Test Login', () => {
  render(<Login />);
  expect(screen.getByPlaceholderText(/Username/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/)).toBeInTheDocument();
});

test('Test Signup', async () => {
  render(<Signup />);
  expect(screen.getByPlaceholderText(/First Name/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Last Name/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Username/)).toBeInTheDocument();
  screen.getAllByPlaceholderText(/Password/).forEach(x => expect(x).toBeInTheDocument());
});

test('Integration Login/Signup', async () => {
  render(<Main />);
  fireEvent.click(screen.getByText(/Sign Up/));
  expect(screen.getByPlaceholderText(/First Name/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Last Name/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Email/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Username/)).toBeInTheDocument();
  screen.getAllByPlaceholderText(/Password/).forEach(x => expect(x).toBeInTheDocument());
  fireEvent.click(screen.getByText(/Log In/));
  expect(screen.getByPlaceholderText(/Username/)).toBeInTheDocument();
  expect(screen.getByPlaceholderText(/Password/)).toBeInTheDocument();
  expect(screen.queryByPlaceholderText(/First Name/)).toBeNull();
  expect(screen.queryByPlaceholderText(/Last Name/)).toBeNull();
  expect(screen.queryByPlaceholderText(/Email/)).toBeNull();
});

test('Integration Popup', async () => {
  render(<Main />);
  fireEvent.click(screen.getByText('Click to Log In'));
  expect(document.getElementById('error_popup')).toBeInTheDocument();
  expect(screen.getByText("Empty Username or Password")).toBeInTheDocument();
  expect(screen.getByText("Please enter a valid username and password.")).toBeInTheDocument();
  fireEvent.click(screen.getByText('Close'));
  expect(document.getElementById('error_popup')).toBeNull();
  expect(screen.queryByText("Empty Username or Password")).toBeNull();
  expect(screen.queryByText("Please enter a valid username and password.")).toBeNull();
});