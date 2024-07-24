import { render, screen } from '@testing-library/react';
import {MainContent} from '../homepage';

const sampleProblem = {
  'id': 'Sample ID',
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

const sampleProblem2 = {
  'id': 'Sample 2 ID',
  'pending': true,
  'title': "Sample 2 Title",
  'statement': "Sample 2 Statement",
  'sandbox': "Sample 2 Sandbox",
  'hints': ["Sample 2 Hint 1", "Sample 2 Hint 2"],
  'xp': 67890,
  'difficulty': 1,
  'mcqs': [],
  'srqs': [],
  'autograded': true, 
  'rating' : [0, 0],
  'solved': false,
  'stats': {'usersCorrect':[], 'usersIncorrect':[]}
}

test('Test Homepage', async () => {
  render(<MainContent solvedProblems={[sampleProblem]} unsolvedProblems={[sampleProblem2]} />);

  const list = [/Recommended Problems/, /Solved Problems/, /Sample Title/, /Sample 2 Title/, /12345/, /67890/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});
