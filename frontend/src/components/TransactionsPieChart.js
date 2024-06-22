// src/components/TransactionsPieChart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const TransactionsPieChart = ({ month }) => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    fetchPieChartData();
  }, month);

  const fetchPieChartData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/piechart', { params: { month } });
      setPieChartData(response.data);
    } catch (error) {
      console.error('Failed to fetch pie chart data', error);
    }
  };

  return (
    <div>
      <h2>Category Distribution</h2>
      <PieChart width={400} height={400}>
        <Pie data={pieChartData} dataKey="count" nameKey="category" cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
          {pieChartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default TransactionsPieChart;
