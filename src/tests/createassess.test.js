import { render, screen } from '@testing-library/react';
import {MainContent} from '../createassess';

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

test('Test CreateAssess for Non-Admin', async () => {
  render(<MainContent assessableProblems={null} createdProblems={[sampleProblem]} />);

  const list = [/Create New Problem/, /Created Problems/, /Sample Title/ ]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});

test('Test CreateAssess for Admin', async () => {
    render(<MainContent assessableProblems={[]} createdProblems={[sampleProblem]} />);
  
    const list = [/Assess Others' Problems/, /Created Problems/, /Create New Problem/, /Sample Title/]
    list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
  });
  