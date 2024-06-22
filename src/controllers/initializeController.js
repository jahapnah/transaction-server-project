// src/controllers/initializeController.js
const axios = require('axios');
const ProductTransaction = require('../models/ProductTransaction'); 

exports.initializeDatabase = async (req, res) => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const transactions = response.data;

    // check kr lena
    await ProductTransaction.deleteMany();
    await ProductTransaction.insertMany(transactions);

    res.status(200).send({ message: 'Database initialized with seed data' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to initialize database' });
  }
};
