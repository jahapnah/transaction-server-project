// src/controllers/transactionController.js
const ProductTransaction = require('../models/ProductTransaction');  // SCHEMA

exports.listTransactions = async (req, res) => {
  const { month, search = '', page = 1, perPage = 10 } = req.query;
  const monthIndex = new Date(`${month} 1, 2020`).getMonth(); // Ignore the year, just get the month index

  try {
    const query = {
      dateOfSale: { $gte: new Date(2020, monthIndex, 1), $lte: new Date(2020, monthIndex + 1, 0, 23, 59, 59) },
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { price: { $regex: search, $options: 'i' } },
      ],
    };

    const transactions = await ProductTransaction.find(query)
      .skip((page - 1) * perPage)
      .limit(parseInt(perPage));

    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch transactions' });
  }
};

// Other controllers for statistics, bar chart, pie chart, and combined data will follow a similar pattern


// src/controllers/transactionController.js

exports.getStatistics = async (req, res) => {
    const { month } = req.query;
    const monthIndex = new Date(`${month} 1, 2020`).getMonth();
  
    try {
      const transactions = await ProductTransaction.find({
        dateOfSale: { $gte: new Date(2020, monthIndex, 1), $lte: new Date(2020, monthIndex + 1, 0, 23, 59, 59) }
      });
  
      const totalSaleAmount = transactions.reduce((sum, transaction) => sum + (transaction.sold ? transaction.price : 0), 0);
      const totalSoldItems = transactions.filter(transaction => transaction.sold).length;
      const totalNotSoldItems = transactions.filter(transaction => !transaction.sold).length;
  
      res.status(200).json({ totalSaleAmount, totalSoldItems, totalNotSoldItems });
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch statistics' });
    }
  };

  



  // src/controllers/transactionController.js

exports.getBarChart = async (req, res) => {
    const { month } = req.query;
    const monthIndex = new Date(`${month} 1, 2020`).getMonth();
    const priceRanges = [
      { min: 0, max: 100 },
      { min: 101, max: 200 },
      { min: 201, max: 300 },
      { min: 301, max: 400 },
      { min: 401, max: 500 },
      { min: 501, max: 600 },
      { min: 601, max: 700 },
      { min: 701, max: 800 },
      { min: 801, max: 900 },
      { min: 901, max: Infinity },
    ];
  
    try {
      const transactions = await ProductTransaction.find({
        dateOfSale: { $gte: new Date(2020, monthIndex, 1), $lte: new Date(2020, monthIndex + 1, 0, 23, 59, 59) }
      });
  
      const barChartData = priceRanges.map(range => ({
        range: `${range.min} - ${range.max === Infinity ? 'above' : range.max}`,
        count: transactions.filter(transaction => transaction.price >= range.min && transaction.price <= range.max).length
      }));
  
      res.status(200).json(barChartData);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch bar chart data' });
    }
  };

  

  // src/controllers/transactionController.js

exports.getPieChart = async (req, res) => {
    const { month } = req.query;
    const monthIndex = new Date(`${month} 1, 2020`).getMonth();
  
    try {
      const transactions = await ProductTransaction.find({
        dateOfSale: { $gte: new Date(2020, monthIndex, 1), $lte: new Date(2020, monthIndex + 1, 0, 23, 59, 59) }
      });
  
      const categoryData = transactions.reduce((acc, transaction) => {
        acc[transaction.category] = (acc[transaction.category] || 0) + 1;
        return acc;
      }, {});
  
      const pieChartData = Object.keys(categoryData).map(category => ({
        category,
        count: categoryData[category]
      }));
  
      res.status(200).json(pieChartData);
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch pie chart data' });
    }
  };

  
  // src/controllers/transactionController.js

exports.getCombinedData = async (req, res) => {
    try {
      const { month } = req.query;
      const [statistics, barChart, pieChart] = await Promise.all([
        this.getStatistics({ query: { month } }, res),
        this.getBarChart({ query: { month } }, res),
        this.getPieChart({ query: { month } }, res),
      ]);
  
      res.status(200).json({
        statistics: statistics.json,
        barChart: barChart.json,
        pieChart: pieChart.json,
      });
    } catch (error) {
      res.status(500).send({ error: 'Failed to fetch combined data' });
    }
  };
  