import '@testing-library/jest-dom';

import { render } from '@testing-library/react';
import React from 'react';

import { SRRISlider } from './SRRISlider';

describe('SRRISlider Component', () => {
  test('renders correctly when srri is provided', () => {
    const { getByText } = render(<SRRISlider srri={5} />);
    expect(getByText('Risk Level: 5/10')).toBeInTheDocument();
  });

  test('renders correctly when srri is not provided', () => {
    const { getByText } = render(<SRRISlider srri={0} />);
    expect(getByText('No SRRI provided')).toBeInTheDocument();
  });

  test('renders the correct number of boxes', () => {
    const { container } = render(<SRRISlider srri={5} />);
    const boxes = container.querySelectorAll('div.w-6.h-6.mx-1.rounded-sm');
    expect(boxes.length).toBe(10);
  });

  test('boxes have the correct colors', () => {
    const { container } = render(<SRRISlider srri={5} />);
    const boxes = container.querySelectorAll('div.w-6.h-6.mx-1.rounded-sm');
    expect(boxes[0]).toHaveStyle('background-color: rgb(0, 255, 0)');
    expect(boxes[9]).toHaveStyle('background-color: rgb(255, 0, 0)');
  });

  test('correct box has the black border when srri is provided', () => {
    const { container } = render(<SRRISlider srri={5} />);
    const boxes = container.querySelectorAll('div.w-6.h-6.mx-1.rounded-sm');
    expect(boxes[4]).toHaveClass('border-4 border-black');
  });
});
