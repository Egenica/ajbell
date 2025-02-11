import '@testing-library/jest-dom';

import { fireEvent, render, screen } from '@testing-library/react';

import Home from './App';

describe('Home Component', () => {
  test('renders without crashing', () => {
    render(<Home />);
    expect(
      screen.getByText(/Investment Strategy Selector/i)
    ).toBeInTheDocument();
  });

  test('initially does not render FundDetails', () => {
    render(<Home />);
    expect(screen.queryByText(/Select Growth Fund:/i)).toBeNull();
  });

  test('renders FundDetails when a fund is selected', () => {
    render(<Home />);
    const selectStrategy = screen.getByLabelText(/Select Strategy:/i);
    fireEvent.change(selectStrategy, { target: { value: 'growth' } });

    expect(screen.getByText(/Select Growth Fund:/i)).toBeInTheDocument();
  });
});
