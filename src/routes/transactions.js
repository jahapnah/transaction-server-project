// src/routes/transactions.js
const express = require('express');
const { initializeDatabase } = require('../controllers/initializeController');
const { listTransactions, getStatistics, getBarChart, getPieChart, getCombinedData } = require('../controllers/transactionController');
const router = express.Router();

router.get('/initialize', initializeDatabase);
router.get('/transactions', listTransactions);
router.get('/statistics', getStatistics);
router.get('/barchart', getBarChart);
router.get('/piechart', getPieChart);
router.get('/combined', getCombinedData);

module.exports = router;
