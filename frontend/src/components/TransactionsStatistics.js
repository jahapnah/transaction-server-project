// src/components/TransactionsStatistics.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsStatistics = ({ month }) => {
  const [statistics, setStatistics] = useState({ totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 });

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/statistics', { params: { month } });
      setStatistics(response.data);
    } catch (error) {
      console.error('Failed to fetch statistics', error);
    }
  };

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Sale Amount: {statistics.totalSaleAmount}</p>
      <p>Total Sold Items: {statistics.totalSoldItems}</p>
      <p>Total Not Sold Items: {statistics.totalNotSoldItems}</p>
    </div>
  );
};

export default TransactionsStatistics;
