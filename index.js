const database = require('./database')
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send(200)
})

app.listen(3000, async() => {
  const connection = await database.connect()
  const result = await connection.query("select top 5 * from pedidos")
  console.log(result)
})