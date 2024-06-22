// src/components/TransactionsBarChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const TransactionsBarChart = ({ month }) => {
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchBarChartData();
  }, [month]);

  const fetchBarChartData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/barchart', { params: { month } });
      setBarChartData(response.data);
    } catch (error) {
      console.error('Failed to fetch bar chart data', error);
    }
  };

  return (
    <div>
      <h2>Price Range Distribution</h2>
      <BarChart width={600} height={300} data={barChartData}>
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default TransactionsBarChart;
