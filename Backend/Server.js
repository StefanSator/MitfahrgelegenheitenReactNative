const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./Connection");

const CustomerRoutes = require("./routes/Customer");

var app = express();

app.use(bodyParser.json());

app.use("/customers", CustomerRoutes);

app.listen(3000);