import { render, screen } from '@testing-library/react';
import {MainContent} from '../tournaments';

test('Test Tournaments', async () => {
  render(<MainContent tournaments={[{'title': 'Sample Title', 'problems':[]}]} problems={[]} />);

  const list = [/Sample Title/, /Problem Set/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});
