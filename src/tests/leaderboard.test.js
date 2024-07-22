import { render, screen } from '@testing-library/react';
import {MainContent} from '../leaderboard';

const sampleUser1 = {'firstName':"John", "lastName":"Doe", 'xp':12345}
const sampleUser2 = {'firstName':"Mistle", "lastName":"Toe", 'badges':[]}

test('Test Leaderboard', async () => {
  render(<MainContent expLeaderboards={[sampleUser1]} badgesLeaderboards={[sampleUser2]} />);

  const list = [/Exp Leaderboard/, /Badges Leaderboard/, /John Doe/, /12345/, /Mistle Toe/]
  list.forEach(x => expect(screen.getByText(x)).toBeInTheDocument());
});
