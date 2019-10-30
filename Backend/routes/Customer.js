const express = require("express");
const connection = require("../Connection");

const Router = express.Router();

Router.get("/", (req, res) => {
    connection.query("Select * From Customer", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

module.exports = Router;