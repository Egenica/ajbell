import '@testing-library/jest-dom';

import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';

import TopHoldingsBarChart from './TopHoldingsBarChart';

const mockHoldings = [
  { name: 'Apple', weighting: 30 },
  { name: 'Microsoft', weighting: 20 },
  { name: 'Google', weighting: 15 },
  { name: 'Amazon', weighting: 25 },
  { name: 'Facebook', weighting: 10 },
];

describe('TopHoldingsBarChart', () => {
  it('renders without crashing', async () => {
    render(<TopHoldingsBarChart holdings={mockHoldings} />);
  });

  it('displays the chart', async () => {
    render(<TopHoldingsBarChart holdings={mockHoldings} />);
    const chart = screen.getByTestId('top-holdings-bar-chart');
    const div = await waitFor(() => chart.querySelector('div'));
    expect(div).toBeInTheDocument();
  });
});
