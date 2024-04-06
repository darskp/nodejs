const express = require('express');
const app = express();
const data = require('./MOCK_DATA.json')
const PORT = 3000
const fs = require('fs')

app.use(express.urlencoded({
  extends: false
}))

app.get('/users', (req, res) => {
  return res.json({ status: 200, res: data })
})


app.get('/api/users', (req, res) => {

  let htmlData = `<ul>
  ${data.map((res) => {
    return (
      `<li>
      <ul>
      <li style="color:red;">ID : ${res?.id ?? 'NF'}</li>
      <li>FIRST Name : ${res?.first_name}</li>
      <li>LAST NAME : ${res.last_name}</li>
      <li>EMAIL : ${res.email}</li>
      <li>GENDER : ${res.gender}</li>
      </ul>
      </li>
      `
    )
  }).join('')}
  </ul>`
  return res.send(htmlData)
})


app.get('/user/:id', (req, res) => {
  let id = Number(req.params.id);
  let userData = data.find((res) => res?.id === id);
  if (userData) {
    return res.json({ status: 200, res: userData })
  } else {
    return res.status(200).json({ status: 200, res: "User id not found" })
  }
})

app.post('/user', (req, res) => {
  const body = req.body;
  let { first_name, last_name } = body;
  if (first_name && last_name) {
    const newData = {
      ...body,
      id: data.length + 1
    }
    data.push(newData)

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), (err, result) => {
      return res.json({ status: 200, id: data.length, message: "created successfully", newData })
    })
  }
  else {
    return res.json({ message: "required fields" })
  }
})



app.patch('/user/:id', (req, res) => {
  const body = req.body;
  if(body.id){
  return res.json({id:"Not have a permission to change the id"})
  }
  const id = Number(req.params.id);
  const findData = data.find((res) => res.id === id);
  const findDataIndex = data.findIndex((res) => res.id === id)
  let modifiedData = {
    ...findData, ...body
  }
  data.splice(findDataIndex, 1, modifiedData)
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), (err, result) => {
    return res.json({ status: 200, message: "created successfully", modifiedData })
  })
})

app.delete('/user/:id', (req, res) => {
  let id = Number(req.params.id);
  let userDataIndex = data.findIndex((res) => res?.id === id);
  if (userDataIndex !== -1) {
    data.splice(userDataIndex, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(data), (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("DELETE METHOD SUCCESS");
      }
    })
    return res.json({ status: 200, res: "userData has been deleted successfully" })
  } else {
    return res.status(200).json({ res: "User id not found" })
  }
})



app.listen(PORT, 'localhost', () => {
  console.log("Server started at port ", PORT);
})