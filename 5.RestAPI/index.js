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

// ===================MIDDLEWARES================================

const createProduct = (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.json({ type: 'POST' });
};

const getAllProduct = (req, res) => {
  res.json(products);
};

const getProductById = (req, res) => {
  const id = +req.params.id;

  const product = products.find((p) => p.id === id);

  res.json(product);
};

const updateProductUsingPut = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products[productIndex] = req.body;
  res.status(201).json({ type: 'PUT' });
};

const updateProductUsingPatch = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(201).json({ type: 'PATCH' });
};

const deleteProductById = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1);
  res.status(201).json({ type: 'DELETE' });
};

//===============================================================

const auth = (req, res, next) => {
  console.log(req.query);
  if (req.body.password === 'admin') {
    next();
  } else {
    res.sendStatus(401);
  }
};

//=================================================================

//CREATE POST /products
app.post('/products', createProduct);

//products
// API Root , base url, entry point
//Read GET
app.get('/products', getAllProduct);

//READ GET
app.get('/products/:id', getProductById);

//READ PUT /products

app.put('/products/:id', updateProductUsingPut);

//PATCH /products

app.patch('/products/:id', updateProductUsingPatch);

//DELETE /products
app.delete('/products/:id', deleteProductById);

//=================================================================

//==================Operations Performend ===============================

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
