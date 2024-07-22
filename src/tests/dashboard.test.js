import { render, screen } from '@testing-library/react';
import {MainContent} from '../dashboard';

const sampleUser = {
    'username': "Sample Username",
    'password': "Sample Password",
    'email': "Sample Email",
    'firstName': "Sample First Name",
    'lastName': "Sample Last Name",
    'account': 'user',
    'xp': 0,
    'badges': []
}

test('Test Homepage', async () => {
  render(<MainContent 
    pendingSubmissions={[]} 
    pendingSubmissionsProblems={[]} 
    solvedProblems={[]} 
    tournaments={[]} 
    user={sampleUser} />);

  const list = [/Ungraded Submissions/, /Solved Problems/, /Past Tournaments/, /Badges/, /Change Account Details/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
  expect(document.getElementById('firstName').value).toEqual("Sample First Name");
  expect(document.getElementById('lastName').value).toEqual("Sample Last Name");
  expect(document.getElementById('email').value).toEqual("Sample Email");
  expect(document.getElementById('username').value).toEqual("Sample Username");
});
