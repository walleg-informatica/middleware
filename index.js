const database = require('./database')
const express = require('express')
const app = express()
const PedidoRepository = require('./pedidoRepository')
const PedidoRoutes = require('./pedidoRoutes')

app.listen(3065, async() => {
  const connection = await database.connect()
  const pedidoRepository = PedidoRepository(connection)
  PedidoRoutes(app, pedidoRepository)
})

/*
SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='BASE TABLE'
const result = await connection.query("SELECT TOP 5 número, produto, lançamento, cliente, vendedor, qte, valor, desconto, acrescimo, data, FormaPagto, hora, obs, cupom, DatadeEntrega, comissao, TipoPedido, StatusPedido FROM pedidos")
const result = await connection.query("SELECT TOP 5 estoque_codigo, estoque_referência, estoque_descrição, estoque_CodBarras, estoque_tabela, estoque_ativo FROM produtos")

*/