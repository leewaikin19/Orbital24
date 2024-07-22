import { render, screen } from '@testing-library/react';
import {MainContent} from '../edit';

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

const sampleSolution = {
    'mcqAns' : [],
    'srqAns' : []
}
test('Test Homepage', async () => {
  render(<MainContent problem={sampleProblem} solution={sampleSolution} />);

  const list = [/Sample Title/, /Sample Statement/, /Sample Sandbox/, /Sample Hint 1/, /Sample Hint 2/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});
