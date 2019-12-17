module.exports = function pedidoRepository(connection) {
  const get = async() => {
    const query = `SELECT TOP 50 número, data, hora 
                   FROM pedidos
                   GROUP BY número, data, hora
                   ORDER BY número DESC`

    return await connection.query(query)
  }

  const getProdutos = async(numero) => {
    const query = `SELECT pe.número, pe.produto, pe.lançamento, pe.cliente,
                          pe.vendedor, pe.qte, pe.valor, pe.desconto, pe.acrescimo, pe.data,
                          pe.FormaPagto, pe.hora, pe.obs, pe.cupom, pe.DatadeEntrega, pe.comissao,
                          pe.TipoPedido, pe.StatusPedido,
                          pr.estoque_descrição
                   FROM pedidos pe
                   LEFT JOIN produtos pr ON pe.produto = pr.estoque_codigo
                   WHERE número = ${numero}
                   ORDER BY lançamento`

    // first item is always the "pedido" summary, other items are the "produtos" from that "pedido"
    const [pedido, ...produtos] = await connection.query(query)
    const result = {
      id: pedido['número'],
      cliente: {
        id: pedido['cliente']
      },
      vendedor: {
        id: pedido['vendedor']
      },
      quantidade: pedido['qte'],
      valor: pedido['valor'],
      data: pedido['data'],
      hora: pedido['hora'],
      formaPagamento: pedido['FormaPagto'],
      observacao: pedido['obs'],
      produtos: produtos.map((produto) => ({
        id: produto['produto'],
        quantidade: produto['qte'],
        valor: produto['valor'],
        descricao: produto['estoque_descrição']
      }))
    }

    return result
  }

  return {get, getProdutos}
}
