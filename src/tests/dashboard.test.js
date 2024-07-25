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

const sampleProblem = {
  'pending': true,
  'title': "Sample Title",
  'statement': "Sample Statement",
  'sandbox': "Sample Sandbox",
  'hints': ["Sample Hint 1", "Sample Hint 2"],
  'xp': 12345,
  'difficulty': 1,
  'mcqs': [],
  'srqs': [],
  'autograded': true, 
  'rating' : [0, 0],
  'solved': false,
  'stats': {'usersCorrect':[], 'usersIncorrect':[]}
}

const sampleSubmission = {
  'questionID': "asd",
  "datetime": 1234567,
}

const sampleSubProb = {
  'id': 'asd',
  'title': 'Sample Submission Title'
}

test('Test Dashboard User', async () => {
  render(<MainContent 
    pendingSubmissions={[sampleSubmission]} 
    pendingSubmissionsProblems={[sampleSubProb]} 
    solvedProblems={[sampleProblem]} 
    tournaments={[]} 
    user={sampleUser} />);

  const list = [
    /Ungraded Submissions/, /Solved Problems/, /Badges/, /Change Account Details/, 
    /Sample Submission Title/,
    /Sample Title/, /12345/,
  ]
  
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
  expect(document.getElementById('firstName').value).toEqual("Sample First Name");
  expect(document.getElementById('lastName').value).toEqual("Sample Last Name");
  expect(document.getElementById('email').value).toEqual("Sample Email");
  expect(document.getElementById('username').value).toEqual("Sample Username");
});

