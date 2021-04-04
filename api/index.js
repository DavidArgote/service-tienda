const express = require('express');
const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const product = require('./components/product/network');
const errors = require('../network/error');

const app = express();
app.use(express.json());

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/product', product);

app.use(errors);

app.listen(config.api.port, () => {
  console.log(`Api listening in port: ${ config.api.port }`);
});