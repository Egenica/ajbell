import '@testing-library/jest-dom';

import { render } from '@testing-library/react';

import Home from './App';

describe('Home Component', () => {
  it('should render without crashing', () => {
    const { container } = render(<Home />);
    expect(container).toBeInTheDocument();
  });

  it('should render the App component', () => {
    const { getByText } = render(<Home />);
    expect(getByText('AJ Bell')).toBeInTheDocument();
  });
});
