const express = require("express");

const app = express();

const morgan = require("morgan");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

//===========DB Connection==========================================

const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");

  console.log("DB Connected");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//mongodb://localhost:27017/

//======body Parser=============================================
app.use(express.json());

// Used for static hosting
app.use(express.static("public"));

app.use("/products", productRoutes);
app.use("/users", userRoutes);

//================Modal-Veiw-Controller===============================

//=================================================================

app.listen(3000);

// /Web Projects/NODEJS_CODERDOST/NodeJS_Updated/4.ExpressJS/index.html
