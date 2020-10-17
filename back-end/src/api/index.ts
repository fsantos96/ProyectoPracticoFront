import express = require('express');
const products = require('./routes/products'),
	router = express.Router();

//routes
router.use("/items", products);

module.exports = router;