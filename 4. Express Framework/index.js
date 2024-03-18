const express = require('express');
const USERS = require('./MOCK_DATA.json')
const app = express();

const PORT = 8000

app.get('/api/users', (req, res) => {
   let htmlCode=`<ul>
    ${USERS.users.map((user)=>
   `<li>${user.first_name}</li>`
    ).join('')}
    </ul>`
  return res.send(htmlCode)
})

app.route('/api/users/:id').get((req, res) => {
    const id = Number(req.params.id); 
    const user = USERS?.users?.find(user => id === user.id)
    console.log(user);
   
    return res.json(user)
}).patch(() => { })
    .delete(() => { })
app.listen(PORT, () => console.log(`server started ${PORT}`))