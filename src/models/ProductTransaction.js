// src/models/ProductTransaction.js
const mongoose = require('mongoose');

const ProductTransactionSchema = new mongoose.Schema({
  id:Number,
  title: String,
  description: String,
  price: Number,
  category: String,
  dateOfSale: Date,
  sold: Boolean
});

module.exports = mongoose.model('ProductTransaction', ProductTransactionSchema);
