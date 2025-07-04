import './App.css';
import React, { useState } from 'react'
import { calcMonthlyPayment } from './calc';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from 'recharts'; //Implementing a pie chart with recharts

const colours = ['#ADA8E6', '#82ca9d', '#ffc658', '#ff7f50'];

function App() {
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [interest, setInterest] = useState('');
  const [monthlyPayment, setMonthlyPayment] = useState(null);

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
    if (lt <= 0) {
      return NaN;
    }

    if (hp < 0 || dp < 0 || lt < 0 || rate < 0) {
      return NaN;
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

  console.log("Chart data", chartData)    
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', padding: '2rem', gap: '2rem' }}>
      <form onSubmit={handleSubmit} style={{ flex: 1 }}>
        <img
          src="/LLoyds-Bank-Logo.png"
          alt="LLoyds Bank Logo"
          style={{width: '150px', marginBottom: '1rem'}} />
        <h2>Mortgage Calculator</h2>
        <div>
          <label>Home Price (£): </label>
          <input
            type = "number"
            placeholder="£0"
            value = {price}
            onChange={(e) => setPrice(e.target.value)}
            />
            <details>
              <summary>What does this mean?</summary>
              <p>The total price of the home you want to purchase.</p>
            </details>
        </div>
        <div>
          <label>Down Payment (£): </label>
          <input
            type = "number"
            placeholder="£0"
            value = {downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            />
            <details>
              <summary>What does this mean?</summary>
              <p>The amount you pay upfront, reducing the total loan needed</p>
            </details>
        </div>
        <div>
          <label>Loan Term (years): </label>
          <input
            type = "number"
            placeholder="0 years"
            value = {loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            />
            <details>
              <summary>What does this mean?</summary>
              <p>The number of years over which you'll repay the mortgage</p>
            </details>
        </div>
        <div>
          <label>Interest Rate (%): </label>
          <input
            type = "number"
            placeholder="0%"
            value = {interest}
            onChange={(e) => setInterest(e.target.value)}
            />
          <details>
            <summary>What does this mean?</summary>
            <p>The annual percentage rate charged by the lender on the remaining loan balance</p>
          </details>
        </div>
        <br />
        <button type="submit">Calculate</button>
      </form>

      {monthlyPayment && (
        <div className="chart-wrapper">
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius="40%"
                outerRadius="80%"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colours[index % colours.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
          <div className="chart-center-label">
            £{monthlyPayment.total}
          </div>
        </div>
        {monthlyPayment && <h3>Monthly Payment: £{monthlyPayment.total}</h3>}
        <a
          href="https://www.lloydsbank.com/help-guidance/call-us.html"
          className='contact-button'
        >
         Contact Us
        </a>
        <a
          href="https://www.lloydsbank.com/help-guidance.html"
          className='help-button'
        >
        Help
        </a>
      </div>
    )}
    </div>
  );
}

export default App;
