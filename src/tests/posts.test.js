import { render, screen } from '@testing-library/react';
import {MainContent} from '../posts';

const sampleComment = {
    'questionID':"asd",
    'author': "Sample Author",
    'datetime': 1234567,
    'content': "Sample Content",
    'replies':[{'author':'Sample 2 Author','datetime':1234567, 'content':'Sample 2 Content'}]
}

test('Test Homepage', async () => {
  render(<MainContent comments={[sampleComment]} problems={[{'id':'asd', 'title':'Sample Title'}]} />);

  const list = [/Past Forum Posts/, /Sample Author/, /Sample Content/, /Sample 2 Author/, /Sample 2 Content/, /Sample Title/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});
