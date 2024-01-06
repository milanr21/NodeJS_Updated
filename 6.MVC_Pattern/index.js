const express = require("express");

const app = express();

const morgan = require("morgan");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

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
