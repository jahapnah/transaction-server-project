// src/App.js
import React, { useState } from 'react';
import TransactionsTable from './components/TransactionsTable';
import TransactionsStatistics from './components/TransactionsStatistics';
import TransactionsBarChart from './components/TransactionsBarChart';
import TransactionsPieChart from './components/TransactionsPieChart';

function App() {
  const [month, setMonth] = useState('March');

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <h1>Product Transactions</h1>
        <select value={month} onChange={handleMonthChange}>
          {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month) => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </header>
      <TransactionsTable month={month} />
      <TransactionsStatistics month={month} />
      <TransactionsBarChart month={month} />
      <TransactionsPieChart month={month} />
    </div>
  );
}

export default App;
