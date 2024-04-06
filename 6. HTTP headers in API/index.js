//headers - additional info/ meta data about the API request and response
//  res.setHeader("X-Name","Darshan")
// add custom header  - prefix should starts with X - - to differentiate with default

const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }))

app.get('/user', (req, res) => {
    res.setHeader("X-Name","Darshan")
    console.log(req.headers);
    return res.status(200).json({ status: "USER ROUTER RESPONSE" })
})
app.get('/users', (req, res) => {
    return res.status(200).json({ status: "USERS ROUTER RESPONSE" })
})

app.get('*', (req,res) => {
    return res.status(404).json({ status: "404 Found" })
})


app.listen(PORT, 'localhost', () => {
    console.log("Listening to the server");
    console.log(`http://localhost:${PORT}`);
})
