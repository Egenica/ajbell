import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React, { act } from 'react';

import { fetchFundData } from '../../server/getData';
import { mockFundData } from './data.mock';
import FundDetails from './FundDetails';

jest.mock('../../server/getData');

describe('FundDetails Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with a selected fund', async () => {
    (fetchFundData as jest.Mock).mockResolvedValue(mockFundData);
    await act(async () => {
      render(<FundDetails selectedFund="test-fund" />);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Fund')).toBeInTheDocument();
    });
  });

  it('displays error message on fetch failure', async () => {
    (fetchFundData as jest.Mock).mockRejectedValue(
      new Error('Failed to fetch')
    );

    await act(async () => {
      render(<FundDetails selectedFund="test-fund" />);
    });

    await waitFor(() => {
      expect(
        screen.getByText('Failed to load fund details. Please try again later.')
      ).toBeInTheDocument();
    });
  });

  it('displays message when no fund is selected', async () => {
    await act(async () => {
      render(<FundDetails selectedFund="" />);
    });

    expect(
      screen.getByText('Select a fund to see its details')
    ).toBeInTheDocument();
  });

  it('displays fetched data correctly', async () => {
    (fetchFundData as jest.Mock).mockResolvedValue(mockFundData);

    await act(async () => {
      render(<FundDetails selectedFund="test-fund" />);
    });

    await waitFor(() => {
      expect(screen.getByText('Test Fund')).toBeInTheDocument();
      expect(screen.getByText('TF')).toBeInTheDocument();
      expect(screen.getByText('Test Sector')).toBeInTheDocument();
      expect(screen.getByText('Test Objective')).toBeInTheDocument();
    });
  });
  it('should open a new window with the correct URL when the button is clicked', async () => {
    const doc = { url: 'http://example.com', type: 'PDF' };
    await act(async () => {
      render(<FundDetails selectedFund="test-fund" />);
    });

    const button = screen.getByText(doc.type);
    window.open = jest.fn();

    fireEvent.click(button);

    expect(window.open).toHaveBeenCalledWith(
      doc.url,
      '_blank',
      'noopener,noreferrer'
    );
  });
});
