// useIntersectionObserver.test.ts
import { act, render, screen } from '@testing-library/react';
import { useRef } from 'react';

import useIntersectionObserver from './useIntersectionObserver';

const TestComponent = () => {
  const ref = useRef(null);
  const [isVisible] = useIntersectionObserver({ threshold: 0.5 });

  return (
    <div>
      <div ref={ref}>Observed Element</div>
      <div data-testid="visibility">
        {isVisible ? 'Visible' : 'Not Visible'}
      </div>
    </div>
  );
};

describe('useIntersectionObserver', () => {
  let observe: jest.Mock;
  let unobserve: jest.Mock;

  beforeAll(() => {
    observe = jest.fn();
    unobserve = jest.fn();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).IntersectionObserver = jest.fn(() => ({
      observe,
      unobserve,
    }));
  });

  it('should set isVisible to true when element is intersecting', () => {
    act(() => {
      render(<TestComponent />);
    });

    // Mock the intersection observer callback
    const entry = { isIntersecting: true };

    act(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).IntersectionObserver.mock.calls[0][0]([entry]);
    });
    expect(screen.getByTestId('visibility').textContent).toBe('Visible');
  });
});
