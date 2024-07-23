import { render, screen, waitFor } from '@testing-library/react';
import Homepage from '../homepage';



test('Test Highlighting for Homepage', async () => {
    render(<Homepage />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    // await waitFor(() => expect(screen.getByText("title 1")).toBeInTheDocument(), {
    //     timeout: 2000,
    //   });
    
  });