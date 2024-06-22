// src/app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const transactionRoutes = require('./routes/transactions');
const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/transactions').then( () => {
    console.log("Mongoose ka connection is successfull")
}).catch( () => {
    console.log("Found some error in connecting database")
})

app.use('/api', transactionRoutes);

app.get("/", (req, res) => {
    res.send("Connected !!");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
