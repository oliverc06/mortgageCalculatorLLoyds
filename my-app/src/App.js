import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'; //Implementing a pie chart with recharts

const colours = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

function App() {
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [interest, setInterest] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  //const {result, setResult} = useState(null)

  function calcMonthlyPayment(price, downPayment, loanTerm, interest) { //Calculates the Monthly Payments based on the values the user submits
    const loanAmount = price - downPayment;
    const monthlyRate = interest / 100 / 12;
    const numberOfPayments = loanTerm * 12

    const monthlyPayment = 
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
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
  };

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

  const chartData = monthlyPayment //Adding pie chart data
    ? [
      { name: 'Principle and Interest', value: monthlyPayment.principleAndInterest },
      { name: 'Property Tax', value: monthlyPayment.propertyTax},
      { name: 'Insurance', value: monthlyPayment.insurance},
      { name: 'Fees', value: monthlyPayment.fees},
      ]
    : [];

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', padding: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ flex: 1 }}>
        <h2>Mortgage Calculator</h2>
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

      {monthlyPayment && (
        <div style={{ flex: 1, textAlign: 'center' }}>
          <h3>Total Monthly Payment</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data = {chartData}
                  dataKey = "value"
                  nameKey = "name"
                  cx = "50%"
                  cy = "50%"
                  innerRadius = {70}
                  outerRadius = {100}
                  label
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colours[index % colours.length]} />
                  ))}
                </Pie>
                <Legend verticalAlign="middle" align="right" />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ marginTop: '-240px', fontWeight: 'bold', fontSize: '1.2rem' }}>
              £{monthlyPayment.total}
            </div>
          </div>
        </div>
      )}
      {monthlyPayment && <h3>Monthly Payment: £{monthlyPayment.total}</h3>}

      <a href="https://www.lloydsbank.com/help-guidance/call-us.html">
      <button>Contact Us</button>
    </a>
    </div>
  );
}

export default App;
