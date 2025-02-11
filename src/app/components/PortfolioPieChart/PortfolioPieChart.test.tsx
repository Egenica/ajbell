import '@testing-library/jest-dom';
import '@testing-library/jest-dom';

import { ResponsivePie } from '@nivo/pie';
import { render } from '@testing-library/react';
import React from 'react';

import { colors } from './colors';
import PortfolioPieChart from './PortfolioPieChart';

type PortfolioAsset = {
  label: string;
  value: number;
};

jest.mock('@nivo/pie', () => ({
  ResponsivePie: jest.fn(() => <div data-testid="responsive-pie" />),
}));

describe('PortfolioPieChart', () => {
  const mockPortfolio: PortfolioAsset[] = [
    { label: 'Asset 1', value: 10.5 },
    { label: 'Asset 2', value: 20.3 },
    { label: 'Asset 3', value: 30.7 },
  ];

  it('should correctly map the portfolio prop to the data array with rounded values', () => {
    render(<PortfolioPieChart portfolio={mockPortfolio} />);
    const expectedData = [
      { id: 'Asset 1', label: 'Asset 1', value: 11 },
      { id: 'Asset 2', label: 'Asset 2', value: 20 },
      { id: 'Asset 3', label: 'Asset 3', value: 31 },
    ];

    expect(ResponsivePie).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expectedData,
      }),
      {}
    );
  });

  const mockDatum = {
    id: 'Stocks',
    value: 50,
  };

  it('renders Tooltip with correct data', () => {
    const { container } = render(
      <div className="border border-gray-300 bg-white p-1">
        <strong>{mockDatum.id}</strong>: {mockDatum.value}%
      </div>
    );

    expect(container.textContent).toBe('Stocks: 50%');
  });

  it('should render the pie chart with the correct colors from the colors array', () => {
    render(<PortfolioPieChart portfolio={mockPortfolio} />);
    expect(ResponsivePie).toHaveBeenCalledWith(
      expect.objectContaining({
        colors: colors.map((color) => color),
      }),
      {}
    );
  });
});
