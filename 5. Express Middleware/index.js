//middleware 
// are functions that have access to the req,res and next function in the application

const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }))


//! processing / loading
// if you don't add next funtion after the log or inside the callback function
// app.use((req,res,next)=>{
// console.log("MIDDLEWARE 1");
// })


//! now it will execute 1 and 2 and next it will return rounter json data
// next()- executes the middleware succeeding the current middleware.

// app.use('/user',(req,res,next)=>{
// console.log('MIDDLEWARE 1');
// next();
// })

// app.use('/user',(req,res,next)=>{
// console.log('MIDDLEWARE 2');
// next();
// })

//! assign any req object

// app.use((req, res, next) => {
//     req.name = "Darshan";
//     req.emailId = "Darshan@gmail.com";
//     req.phoneNumber = 123445;
//     next()
// })
// app.use((req, res, next) => {
//     console.log(req.name)
//     next()
// })

//! To Maintain a Log file
//create log.txt
const fs = require('fs');
app.use((req, res, next) => {
    const date = new Date()
    let logData = `\n ${date.toLocaleString()} - request Method:${req.method}, request path : ${req.path}, IP address : ${req.ip}, `
    fs.appendFile('log.txt', logData, (err) => {
        next();
    })

})


app.get('/user', (req, res) => {
    return res.json({ status: "USER ROUTER RESPONSE" })
})
app.get('/users', (req, res) => {
    return res.json({ status: "USERS ROUTER RESPONSE" })
})

app.get('*', (req,res) => {
    return res.json({ status: "404 Found" })
})


app.listen(PORT, 'localhost', () => {
    console.log("Listening to the server");
    console.log(`http://localhost:${PORT}`);
})
