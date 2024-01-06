const express = require('express');

const app = express();

const morgan = require('morgan');

const productController = require('./controller/product');
const productRouter = express.Router();

//======body Parser=============================================
app.use(express.json());

// Used for static hosting
app.use(express.static('public'));

app.use('/api', productRouter);

//================Modal-Veiw-Controller===============================

//CREATE POST /products
productRouter
  .post('/products', productController.createProduct)

  .get('/products', productController.getAllProduct)

  .get('/products/:id', productController.getProductById)

  .put('/products/:id', productController.updateProductUsingPut);

app.patch('/products/:id', productController.updateProductUsingPatch);

//DELETE /products
app.delete('/products/:id', productController.deleteProductById);

//=================================================================

app.listen(3000);

// /Web Projects/NODEJS_CODERDOST/NodeJS_Updated/4.ExpressJS/index.html
