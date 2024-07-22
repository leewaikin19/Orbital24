import { render, screen } from '@testing-library/react';
import {MainContent} from '../homepage';

test('Test Homepage', async () => {
  render(<MainContent solvedProblems={[]} unsolvedProblems={[]} />);

  const list = [/Recommended Problems/, /Solved Problems/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});
