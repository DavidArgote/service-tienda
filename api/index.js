const express = require('express');
const cors = require('cors');
const config = require('../config.js');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const product = require('./components/product/network');
const employee = require('./components/employee/network');
const invoice = require('./components/invoice/network');
const params = require('./components/parms/network');
const errors = require('../network/error');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/user', user);
app.use('/api/auth', auth);
app.use('/api/product', product);
app.use('/api/employee', employee);
app.use('/api/invoice', invoice);
app.use('/api/params', params);

app.use(errors);

app.listen(config.api.port, () => {
  console.log(`Api listening in port: ${ config.api.port }`);
});