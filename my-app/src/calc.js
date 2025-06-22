export default function calcMonthlyPayment(price, downPayment, loanTerm, interest) {
    //Calculates the Monthly Payments based on the values the user submits
  if (
    loanTerm <= 0 ||
    price < 0 ||
    downPayment < 0 ||
    interest < 0 ||
    downPayment > price
  ) {
    return {
      principleAndInterest: NaN,
      propertyTax: NaN,
      insurance: NaN,
      fees: NaN,
      total: NaN
    };
  }
  const loanAmount = price - downPayment;
  const monthlyRate = interest / 100 / 12;
  const numberOfPayments = loanTerm * 12;

    //Adding fees within monthly payments for use with pie chart
  const principleAndInterest =
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  const propertyTax = (price * 0.0125) / 12;
  const insurance = 100;
  const fees = 50;

  const total = principleAndInterest + propertyTax + insurance + fees;

  return {
    principleAndInterest: +principleAndInterest.toFixed(2),
    propertyTax: +propertyTax.toFixed(2),
    insurance,
    fees,
    total: +total.toFixed(2)
  };
}
