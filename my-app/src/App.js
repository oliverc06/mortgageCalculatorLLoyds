import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react'

function App() {
  const [count, setCount] = useState(0);
  const [price, setPrice] = useState('');
  const [downPayment, setDownPayment] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [interest, setInterest] = useState('');

  const mortgage = 0; //change later to calc mortgage payments

  const handleSubmit = (e) => { //arrow function with parameter e as the event object
    e.preventDefault(); //Prevents the page reloading when submitting
    // alert(`Count: ${count}, Price: ${price}, DownPayment: ${downPayment}, LoanTerm: ${loanTerm}, Interest: ${interest}`);
  };

  return (
    <div style={{ textAlign: 'centre', marginTop: '50px' }}>
      <h2>Home Price</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type = "number"
            placeholder="Home Price"
            value = {price}
            onChange={(e) => setPrice(e.target.value)}
            />
        </div>
        <br />
        <button type="submit">Submit</button>
      </form>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default App;
