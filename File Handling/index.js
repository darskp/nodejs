"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var os = require("os");
if (fs.existsSync('./index1.txt')) {
    fs.appendFile('./index1.txt', "".concat(Date.now(), " continue \n"), function (err) {
        if (err) {
            console.log(err);
        }
        else {
            console.log("success");
        }
    });
}
else {
    console.log("file not exist");
}
fs.cpSync('./index1.txt', './index2.txt');
fs.unlinkSync('./index2.txt');
var result = fs.statSync('./index1.txt');
console.log(result.size);
console.log(os);
