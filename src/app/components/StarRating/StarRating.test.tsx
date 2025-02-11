import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';

import { StarRating } from './StarRating';

describe('StarRating Component', () => {
  it('renders the correct number of full stars', () => {
    render(<StarRating rating={3} />);
    const fullStars = screen.getAllByText('★');
    expect(fullStars.length).toBe(3);
  });

  it('renders the correct number of empty stars', () => {
    render(<StarRating rating={3} />);
    const emptyStars = screen.getAllByText('☆');
    expect(emptyStars.length).toBe(2);
  });

  it('renders no stars when rating is 0', () => {
    render(<StarRating rating={0} />);
    const fullStars = screen.queryAllByText('★');
    const emptyStars = screen.getAllByText('☆');
    expect(fullStars.length).toBe(0);
    expect(emptyStars.length).toBe(5);
  });

  it('renders all full stars when rating is 5', () => {
    render(<StarRating rating={5} />);
    const fullStars = screen.getAllByText('★');
    const emptyStars = screen.queryAllByText('☆');
    expect(fullStars.length).toBe(5);
    expect(emptyStars.length).toBe(0);
  });

  it('calculates empty stars correctly', () => {
    render(<StarRating rating={3} />);
    const emptyStars = screen.queryAllByText('☆').length;
    expect(emptyStars).toBe(2); // Assuming a total of 5 stars, 5 - 3 = 2
  });
});
