import { render, screen } from '@testing-library/react';
import {MainContent} from '../explore';

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

test('Test Problems', async () => {
  render(<MainContent problems={[sampleProblem]} />);

  const list = [/Sample Title/, /Explore\/Search Problems/, /Problem Title/, "Exp", /12345/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});