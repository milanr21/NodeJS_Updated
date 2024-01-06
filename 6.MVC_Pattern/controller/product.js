const fs = require("fs");

const data = JSON.parse(fs.readFileSync("data.json", "utf-8"));
const products = data.products;

// ===================MIDDLEWARES================================

exports.createProduct = (req, res) => {
  console.log(req.body);
  products.push(req.body);
  res.json({ type: "POST" });
};

exports.getAllProduct = (req, res) => {
  res.json(products);
};

exports.getProductById = (req, res) => {
  const id = +req.params.id;

  const product = products.find((p) => p.id === id);

  res.json(product);
};

exports.updateProductUsingPut = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  products[productIndex] = req.body;
  res.status(201).json({ type: "PUT" });
};

exports.updateProductUsingPatch = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1, { ...product, ...req.body });
  res.status(201).json({ type: "PATCH" });
};

exports.deleteProductById = (req, res) => {
  const id = +req.params.id;
  const productIndex = products.findIndex((p) => p.id === id);
  const product = products[productIndex];
  products.splice(productIndex, 1);
  res.status(201).json({ type: "DELETE" });
};
