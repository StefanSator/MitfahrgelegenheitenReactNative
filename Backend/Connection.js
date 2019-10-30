var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "Mitfahrgelegenheiten",
    multipleStatements: true
});

connection.connect((err) => {
    if (!err) {
        console.log("Established.")
    } else {
        console.log("Failed.")
    }
})

module.exports = connection;