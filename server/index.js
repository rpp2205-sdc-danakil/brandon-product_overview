const express = require('express');
const db = require('../database/db.js');
const port = 3001;
const app = express();
const { getProductHandler, getRelatedHandler, getStylesHandler } = require('./controller/helper.js');

app.get('/products/:product_id', getProductHandler);

app.get('/products/:product_id/styles', getStylesHandler);

app.get('/products/:product_id/related', getRelatedHandler);

const server = app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

module.exports = server;