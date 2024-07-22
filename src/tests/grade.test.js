import { render, screen } from '@testing-library/react';
import {MainContent} from '../grade';

test('Test Grade', async () => {
  render(<MainContent 
    problems={[{'id':'asd', 'title':'Sample Title'}]} 
    submissions={[{'questionID':'asd', 'username':'Sample username', 'datetime': 1234567}]} />);

  const list = [/Problems/, /User/, /Date/, /Sample Title/, /Sample username/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});
