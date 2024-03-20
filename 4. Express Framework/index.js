const express = require('express');
const USERS = require('./MOCK_DATA.json')
const fs = require('fs')
const app = express();
app.use(express.urlencoded({
  extends: false
}))
const PORT = 8000

//ssr
app.get('/users', (req, res) => {
  let htmlCode = `<ul>
    ${USERS.map((user) =>
    `<li>${user.first_name}</li>`
  ).join('')}
    </ul>`
  return res.send({
    data: htmlCode,
    status: "success"
  })
})


app.get('/api/users', (req, res) => {
  return res.json(USERS)
})

app.post('/api/adduser', (req, res) => {
  let bodyData = req.body;
  USERS.push({
    ...bodyData,
    id: USERS.length + 1
  })
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(USERS), (err) => {
    return res.json({
      status: "Added successfully",
      id: USERS.length
    })
  })
})

app.route('/api/users/:id').get((req, res) => {
  const id = Number(req.params.id);
  const user = USERS?.find(user => id === user.id)
  console.log(user);

  if (user) {
    return res.json(user)
  } else {
    return res.json({
      status: "User data Not found"
    })
  }
}).patch((req, res) => {
  let body = req.body;
  console.log(body);
  let id = Number(req.params.id);
  console.log(id);
  let data = USERS.find((user) => user.id == id);
  let index = USERS.findIndex((user) => user.id == id);
  console.log("data==>", data);
  let updatedData = {
    ...data, ...body
  }
  USERS.splice(index, 1, updatedData)
  console.log(updatedData)
  fs.writeFile('./MOCK_DATA.json', JSON.stringify(USERS), (err) => {
    return res.json({
      status: "Updated successfully"
    })
  })

}).delete((req, res) => {
  let id = Number(req.params.id);
  let findData = USERS.findIndex((user) => user.id === id);
  console.log("data", findData);
  if (findData !== -1) {
    let updatedData = USERS.filter((user) => user.id !== id);
    console.log(USERS.length)
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(updatedData), (err) => {
      return res.json({
        status: "deleted successfully"
      })
    })
  } else {
    return res.json({
      status: "ID not found"
    })
  }
})


app.listen(PORT, () => console.log(`server started ${PORT}`))