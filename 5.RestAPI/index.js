const { profileEnd } = require('console');
const express = require('express');

const fs = require('fs');

const app = express();

const morgan = require('morgan');

const data = JSON.parse(fs.readFileSync('data.json', 'utf-8'));
const products = data.products;

app.use(express.json());

// Used for static hosting
app.use(express.static('public'));

// app.use(morgan('combined'));
// app.use(morgan('dev'));
// app.use(morgan('tiny'));
// app.use(morgan('common'));

const auth = (req, res, next) => {
  console.log(req.query);
  if (req.body.password === 'admin') {
    next();
  } else {
    res.sendStatus(401);
  }
};

// app.use(auth);
// API - ENDPOINTS / ROUTES

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

//products
// API Root , base url, entry point
//Read GET
app.get('/products', (req, res) => {
  res.json(products);
});

//READ GET
app.get('/products/:id', (req, res) => {
  const id = +req.params.id;

  const product = products.find((p) => p.id === id);

  res.json(product);
});

//CREATE POST /products
app.post('/products', (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.json({ type: 'POST' });
});

//READ PUT /products

app.put('/products/:id', (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products[productIndex] = req.body;
  res.status(201).json({ type: 'PUT' });
});

//PATCH /products

app.patch('/products/:id', (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(201).json({ type: 'PATCH' });
});

//DELETE /products
app.delete('/products/:id', (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1);
  res.status(201).json({ type: 'DELETE' });
});

app.get('/about', (req, res) => {
  res.send('<h1>About Us</h1>');
});

app.get('/contact', auth, (req, res) => {
  res.send('<h1>Contact Us</h1>');
});

app.get('/index', (req, res) => {
  res.sendFile(
    '/Web Projects/NODEJS_CODERDOST/NodeJS_Updated/4.ExpressJS/index.html'
  );
});

app.get('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.post('/', auth, (req, res) => {
  res.json({ type: 'POST' });
});

app.put('/', (req, res) => {
  res.json({ type: 'PUT' });
});

app.delete('/', (req, res) => {
  res.json({ type: 'DELETE' });
});

app.listen(3000);

// /Web Projects/NODEJS_CODERDOST/NodeJS_Updated/4.ExpressJS/index.html
