module.exports = function pedidoRepository(connection) {
  const get = async() => {
    return await connection.query("SELECT TOP 50 número, data, hora FROM pedidos GROUP BY número,data, hora ORDER BY número DESC")
  }

  const getProdutos = async(numero) => {
    return await connection.query(`SELECT número, produto, lançamento, cliente, vendedor, qte, valor, desconto, acrescimo, data, FormaPagto, hora, obs, cupom, DatadeEntrega, comissao, TipoPedido, StatusPedido FROM pedidos WHERE número = ${numero}`)
  }

  return {get, getProdutos}
}
