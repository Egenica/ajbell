import '@testing-library/jest-dom';

import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import FundSelector from './FundSelector';

describe('FundSelector Component', () => {
  it('should render correctly', () => {
    const { container } = render(<FundSelector onSelectFund={() => {}} />);
    expect(container).toMatchSnapshot();
  });

  it('should display growth funds when growth strategy is selected', () => {
    const { getByLabelText, getByText } = render(
      <FundSelector onSelectFund={() => {}} />
    );

    fireEvent.change(getByLabelText('Select Strategy:'), {
      target: { value: 'growth' },
    });

    expect(getByText('Select Growth Fund:')).toBeInTheDocument();
    expect(getByText('Cautious')).toBeInTheDocument();
    expect(getByText('Balanced')).toBeInTheDocument();
    expect(getByText('Adventurous')).toBeInTheDocument();
  });

  it('should display responsible fund when responsible strategy is selected', () => {
    const { getByLabelText, getByText } = render(
      <FundSelector onSelectFund={() => {}} />
    );

    fireEvent.change(getByLabelText('Select Strategy:'), {
      target: { value: 'responsible' },
    });

    expect(getByText('Select Responsible Fund:')).toBeInTheDocument();
    expect(getByText('Responsible')).toBeInTheDocument();
  });

  it('should call onSelectFund with the correct value when a fund is selected', () => {
    const onSelectFundMock = jest.fn();
    const { getByLabelText } = render(
      <FundSelector onSelectFund={onSelectFundMock} />
    );

    fireEvent.change(getByLabelText('Select Strategy:'), {
      target: { value: 'growth' },
    });
    fireEvent.change(getByLabelText('Select Growth Fund:'), {
      target: { value: 'cautious' },
    });

    expect(onSelectFundMock).toHaveBeenCalledWith('cautious');
  });

  it('should reset fund selection when strategy changes', () => {
    const onSelectFundMock = jest.fn();
    const { getByLabelText } = render(
      <FundSelector onSelectFund={onSelectFundMock} />
    );

    fireEvent.change(getByLabelText('Select Strategy:'), {
      target: { value: 'growth' },
    });
    fireEvent.change(getByLabelText('Select Growth Fund:'), {
      target: { value: 'cautious' },
    });
    fireEvent.change(getByLabelText('Select Strategy:'), {
      target: { value: 'responsible' },
    });

    expect(onSelectFundMock).toHaveBeenCalledWith('');
  });
});
