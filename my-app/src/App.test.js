import { render, screen } from '@testing-library/react';
import App from './App';
import calcMonthlyPayment from './calc';

test('renders mortgage calc header', () => {
  render(<App />);
  expect(screen.getByText(/Mortgage Calculator/i)).toBeInTheDocument();
});


test('works with zero down payment', () => { //Some people pay with no deposit, should still work
  render(<App />);
  const result = calcMonthlyPayment(200000, 0, 30, 3.0);
  expect(result.total).toBeGreaterThan(0);
});

test('throws if loan term is 0', () => { //Cannot get a loan for 0 years
  render(<App />);
  const result = calcMonthlyPayment(200000, 50000, 0, 4);
  expect(result.total).toBeNaN();
});

test('handles negative values gracefully', () => {
  render(<App />);
  const result = calcMonthlyPayment(-300000, -10000, -25, -3.5);
  expect(result.total).toBeNaN();
});

test('calculates short-term loan', () => { //Still works even with very short loan terms
  render(<App />);
  const result = calcMonthlyPayment(120000, 20000, 1, 5);
  expect(result.total).toBeGreaterThan(0);
});
 