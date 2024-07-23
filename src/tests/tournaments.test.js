import { render, screen } from '@testing-library/react';
import {MainContent} from '../tournaments';

const sampleProblem = {
  'id': 'asd',
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

test('Test Tournaments', async () => {
  render(<MainContent tournaments={[{'title': 'Sample Tournament', 'problems':['asd']}]} problems={[sampleProblem]} />);

  const list = [/Sample Tournament/, /Problem Set/, /Sample Title/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});
