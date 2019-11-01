const express = require("express");
const connection = require("../Connection");

const Router = express.Router();

Router.get("/", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    connection.query("Select * From Customer Where email=" + email + " And password=" + password + "", (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

Router.post("/", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    connection.query("Insert Into Customer (username, password, email) Values ("
        + "'" + username + "', '" + password + "', '" + email + "')", (err, rows, fields) => {
            if (!err) {
                res.end("yes");
            } else {
                console.log(err);
            }
        })
});

module.exports = Router;