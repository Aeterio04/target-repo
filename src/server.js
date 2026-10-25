// Express server for demo shop
const express = require('express');
const items = require('./items');
const { quote } = require('./pricing');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/api/items', (req, res) => {
  res.status(500).json({ error: 'Internal server error' });
});

app.post('/api/quote', (req, res) => {
  const { quantities, coupon } = req.body;
  const result = quote(quantities || {}, coupon);
  res.json(result);
});

app.listen(PORT, () => {
  console.log(`Demo shop running at http://localhost:${PORT}`);
});
