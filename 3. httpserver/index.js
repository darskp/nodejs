"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var fs = require("fs");
var url = require("url");
var port = 8000;
var server = http.createServer(function (req, res) {
    if (req.url === '/favicon.ico') {
        return res.end();
    }
    var myURL = url.parse(req.url, true);
    console.log(myURL);
    var date = new Date();
    var dateNow = date.toLocaleString();
    fs.appendFile('./index.txt', "Time - ".concat(dateNow, ", Requested - ").concat(req.url, ", Method - ").concat(req.method, "  \n"), function (Error) {
        switch (myURL.pathname) {
            case '/':
                res.end("Hi, ".concat(myURL.query.name));
                break;
            case '/about':
                res.end("hi i am about");
                break;
            default: res.end('404');
        }
    });
});
server.listen(8000, function () {
    console.log("listening to the server");
    console.log("http://localhost:".concat(port, "/"));
});
