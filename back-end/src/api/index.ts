import express = require('express');
const products = require('./routes/products'),
currency = require('./routes/currency'),
router = express.Router();

//routes
router.use("/items", products);
router.use("/currency", currency);


module.exports = router;