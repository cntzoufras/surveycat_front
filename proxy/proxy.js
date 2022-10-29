const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const axios = require('axios');

require('dotenv').config();

const app = express();

app.use(morgan('tiny'));
app.use(cors());

app.get('/coinmarket/*', (req, res) => {
  const cutUrl = req.originalUrl.replace('/coinmarket', '');
  let url = `https://pro-api.coinmarketcap.com${cutUrl}`
  
  axios
    .get(url, {
      headers: { 'X-CMC_PRO_API_KEY': process.env.COINMARKETCAP_API_KEY }, // add your api key to .env
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.status(err.response.status).send(err.response.data);
    });
});

app.get('/coincap/*', (req, res) => {
  const cutUrl = req.originalUrl.replace('/coincap', '');
  let url = `https://api.coincap.io${cutUrl}`;

  axios
    .get(url, {
      headers: { },
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err.response.data);
      res.status(err.response.status).send(err.response.data);
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Listening on port ', port);
});
