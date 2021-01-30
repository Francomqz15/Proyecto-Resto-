const express = require('express')
const dbSetup = require('../config/mysql');

const app = express()
const port = 3000

const userAdmin = 'admin'
const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

/* 3 */
app.post('/request/create', async(req, res) => {

  const userId = req.body.userId
  const status = req.body.status
  const description = req.body.description

  await dbSetup.createRequest(userId, status, description)
  res.send('Request sended')
})

/* 4 */
app.put('/request/update/:id', async (req, res) => {
  const userType = req.body.userType
  const id = req.body.id
  const status = req.body.status
  if (userType === userAdmin) {
    await dbSetup.updateRequest(id, status)
    res.send('Request updated')
  } else {
    res.send("Your user doesn't have permission")
  }
})

/* 5 */
app.put