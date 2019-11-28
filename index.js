const database = require('./database')
const express = require('express')

const app = express()

app.listen(async() => {
  await database.connect()
  const result = await database.query("SELECT * FROM produtos")
  console.log(result)
}, 3000)
