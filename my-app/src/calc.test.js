import calcMonthlyPayment from './calc';

test('calculates total correctly with valid input', () => {
  const result = calcMonthlyPayment(300000, 60000, 25, 3.5);
  expect(result.total).toBeGreaterThan(0);
});
