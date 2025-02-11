import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<LoadingSpinner />);

    expect(container).toBeInTheDocument();
  });

  it('renders the correct number of div elements', () => {
    const { container } = render(<LoadingSpinner />);
    const divElements = container.querySelectorAll('.lds-ring > div');
    expect(divElements.length).toBe(4);
  });

  it('has the correct class name', () => {
    const { container } = render(<LoadingSpinner />);
    const spinnerElement = container.querySelector('.lds-ring');
    expect(spinnerElement).toHaveClass('lds-ring');
  });

  it('renders the loading text', () => {
    const { getByTestId } = render(
      <LoadingSpinner loadingText="Loading data..." />
    );
    expect(getByTestId('loading-spinner')).toHaveTextContent('Loading data...');
  });

  it('renders the default loading text', () => {
    const { getByTestId } = render(<LoadingSpinner />);
    expect(getByTestId('loading-spinner')).toHaveTextContent('Loading...');
  });

  it('renders the default text color class', () => {
    const { getByTestId } = render(<LoadingSpinner />);
    expect(getByTestId('loading-spinner')).toHaveClass('text-white');
  });

  it('renders the custom text color class', () => {
    const { getByTestId } = render(
      <LoadingSpinner textColorClass="text-black" />
    );
    expect(getByTestId('loading-spinner')).toHaveClass('text-black');
  });

  it('renders the default spinner color', () => {
    const { container } = render(<LoadingSpinner />);
    const spinnerElement = container.querySelector('.lds-ring');

    // Check if the spinner element exists
    expect(spinnerElement).not.toBeNull();

    // Check if the spinner element has the correct style
    if (spinnerElement) {
      expect(spinnerElement).toHaveStyle('--spinner-color: rgb(6, 88, 254)');
    }
  });

  it('renders the custom spinner color', () => {
    const { container } = render(<LoadingSpinner spinnerColor="red" />);
    const spinnerElement = container.querySelector('.lds-ring');

    // Check if the spinner element exists
    expect(spinnerElement).not.toBeNull();

    // Check if the spinner element has the correct style
    if (spinnerElement) {
      expect(spinnerElement).toHaveStyle('--spinner-color: red');
    }
  });
});
