const express = require("express");

const productController = require("../controller/product");

const productRouter = express.Router();

productRouter
  .post("/", productController.createProduct)

  .get("/", productController.getAllProduct)

  .get("/:id", productController.getProductById)

  .put("/:id", productController.updateProductUsingPut)

  .patch("/:id", productController.updateProductUsingPatch)

  .delete("/:id", productController.deleteProductById);

module.exports = productRouter;
