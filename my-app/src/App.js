import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'

function App() {
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [interest, setInterest] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  function calcMonthlyPayment(price, downPayment, loanTerm, interest) { //Calculates the Monthly Payments based on the values the user submits
    const loanAmount = price - downPayment;
    const monthlyRate = interest / 100 / 12;
    const numberOfPayments = loanTerm * 12

    const monthlyPayment = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment.toFixed(2);
  }

  const handleSubmit = (e) => { //arrow function with parameter e as the event object
    e.preventDefault(); //Prevents the page reloading when submitting

    const rate = parseFloat(interest);
    const hp = parseFloat(price);
    const dp = parseFloat(downPayment);
    const lt = parseFloat(loanTerm);

    if (!hp || !dp || !lt || !rate || dp > hp) {
      alert("Invalid numbers. Down payment must be less than home price.")
      return;
    }
    const result = calcMonthlyPayment(hp, dp, lt, rate);
    setMonthlyPayment(result);
  };

  return (
    <div style={{ textAlign: 'centre', marginTop: '50px' }}>
      <h2>Mortgage Calculator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Home Price (£): </label>
          <input
            type = "number"
            placeholder="£0"
            value = {price}
            onChange={(e) => setPrice(e.target.value)}
            />
        </div>
        <div>
          <label>Down Payment (£): </label>
          <input
            type = "number"
            placeholder="£0"
            value = {downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            />
        </div>
        <div>
          <label>Loan Term (years): </label>
          <input
            type = "number"
            placeholder="0 years"
            value = {loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            />
        </div>
        <div>
          <label>Interest Rate (%): </label>
          <input
            type = "number"
            placeholder="0%"
            value = {interest}
            onChange={(e) => setInterest(e.target.value)}
            />
        </div>
        <br />
        <button type="submit">Calculate</button>
      </form>

      {monthlyPayment && <h3>Monthly Payment: £{monthlyPayment}</h3>}

      <a href="https://www.lloydsbank.com/help-guidance/call-us.html">
      <button>Contact Us</button>
    </a>
    </div>
  );
}

export default App;
