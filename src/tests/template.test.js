import { render, screen } from '@testing-library/react';
import { Loader, Popup, SideContainer, NavBar } from '../template';

test('Test Loader', async () => {
  render(<Loader solvedProblems={[]} unsolvedProblems={[]} />);

  const list = [/Loading.../]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});

test('Test Popup', async () => {
  render(<Popup title={"Sample Title"} content={"Sample Content"} trigger={true} />);

  const list = [/Sample Title/, /Sample Content/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});

test('Test SideContainer for Non-Admin', async () => {
  render(<SideContainer name={"Sample Name"} exp={12345} isAdmin={false} />);

  const list = [/Account Dashboard/, /Tournaments/, /Create Problems/, /Leaderboards/, /Forum Posts/, /Report Bugs/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
  expect(screen.queryByText(/Grade Submissions/)).toBeNull();
});

test('Test SideContainer for Admin', async () => {
  render(<SideContainer name={"Sample Name"} exp={12345} isAdmin={true} />);

  const list = [/Account Dashboard/, /Tournaments/, /Create Problems/, /Grade Submissions/, /Leaderboards/, /Forum Posts/, /Report Bugs/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});

test('Test NavBar', async () => {
  render(<NavBar solvedProblems={[]} unsolvedProblems={[]} />);

  const list = [/Home/, /Problems/, /Logout/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});
