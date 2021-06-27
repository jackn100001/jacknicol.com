// index.js

/**
 * Required External Modules
 */
const express = require("express");
const path = require("path");

/**
 * App Variables
 */
const app = express();
const port = process.env.PORT || "8000";

/**
 *  App Configuration
 */
app.use(express.static(__dirname + '/public'));

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/") + 'index.html');
});

app.get("/text-file", (req, res) => {
    var filename = req.query.filename + ".txt";
    var fs = require('fs');
    fs.readFile("public/text/" + filename, 'utf8', function(err, data) {
        if (err) throw err;
        res.send(data);
    });
});

/**
 * Server Activation
 */
 app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});