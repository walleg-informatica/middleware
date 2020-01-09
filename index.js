const database = require('./database')
const awsServerlessExpress = require('aws-serverless-express')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.json())

const fs = require('fs')

const initialize = () => new Promise((resolve, reject) => {
  database.connect()
    .then((connection) => {
      fs.readdirSync('./routes')
        .map((routeFile) => {
          const moduleName = routeFile.replace('Routes.js', '')
          const repositoryModule = require(`./repositories/${moduleName}Repository.js`)
          const routeModule = require(`./routes/${moduleName}Routes.js`)

          const repository = repositoryModule(connection)
          routeModule(app, repository)
        })
      resolve()
    })
    .catch((e) => reject(e))
})

  

const arguments = process.argv.slice(2)
if(arguments.length === 1 && arguments[0] === 'local') {
  initialize()
    .then(() => { app.listen(8000) })
} else {
  module.exports.handler = (event, context, callback) => {
    initialize()
      .then(() => {
        const server = awsServerlessExpress.createServer(app)
        awsServerlessExpress.proxy(server, event, context)
      })
  }

}


/*
SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'
const result = await connection.query("SELECT TOP 5 número, produto, lançamento, cliente, vendedor, qte, valor, desconto, acrescimo, data, FormaPagto, hora, obs, cupom, DatadeEntrega, comissao, TipoPedido, StatusPedido FROM pedidos")
const result = await connection.query("SELECT TOP 5 estoque_codigo, estoque_referência, estoque_descrição, estoque_CodBarras, estoque_tabela, estoque_ativo FROM produtos")
*/