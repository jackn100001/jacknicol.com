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
app.use(express.static(__dirname + "/public"));

/**
 * Routes Definitions
 */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views/") + "index.html");
});

app.get("/window", (req, res) => {
    var fs = require("fs");
    var type = req.query.type;
    var filename = req.query.filename;

    if (type == "text-file") {
        filename += ".txt";
        filePath = "public/text/" + filename;
    } else if (type == "folder") {
        filename += ".html"
        filePath = path.join(__dirname, "views/") + filename;
    }
    console.log(filePath)
    fs.readFile(filePath, "utf8", function(err, data) {
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