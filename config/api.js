const express = require('express')
const dbSetup = require('./mysql');

const app = express()
const port = 3000
const userAdmin = 'admin'

const bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

const getUsersApi = (data) => {
  app.get('/user', (req, res) => {
    res.send(data)
  }) 
}

/* 1 */
  const setUsersApi = (data) => {
    app.post('/user/create ', (req, res) => {
      res.send(data)
    }) 
  }

/* 2 */
  const getProductsApi = (data) => {
    app.get('/products', (req, res) => {
      res.send(data)
    }) 
  }

/* 3 */
  app.post('/request/create', async(req, res) => {

    const userId = req.body.userId
    const status = req.body.status
    const description = req.body.description

    await dbSetup.createRequest(userId, status, description)
    res.send('Request sended')
  })

/* 4 */
  app.put('/request/update', async (req, res) => {
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
  app.post('/products/create', async (req, res) => {
    const userType = req.body.userType

    const name  = req.body.name
    const price  = req.body.price
    const quantity  = req.body.quantity

    if (userType === userAdmin) {
      await dbSetup.createProduct(name, price, quantity)
      res.send('Product created')
    } else {
      res.send("Your user doesn't have permission")
    }
  })


  app.put('/products/update', async (req, res) => {
    const userType = req.body.userType

    const id = req.body.id
    const name = req.body.name
    const price = req.body.price
    const quantity = req.body.quantity

    if (userType === userAdmin) {
      await dbSetup.updateProduct(id, name, price, quantity)
      res.send('Product updated')
    } else {
      res.send("Your user doesn't have permission")
    }
  })

  app.delete('/products/delete', async (req, res) => {
    const userType = req.body.userType
    const id = req.body.id

    if (userType === userAdmin) {
      await dbSetup.deleteProduct(id)
      res.send('Product removed')
    } else {
      res.send("Your user doesn't have permission")
    }
  })


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

exports.getUsersApi = getUsersApi;
exports.setUsersApi = setUsersApi;
exports.getProductsApi = getProductsApi;