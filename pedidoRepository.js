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
                          pr.estoque_descrição, 
                          clientes.RazaoSocial,
                          vendedores.nome,
                          TipoPedido.Tipo,
                          TipoProduto.Descrição,
                          FormaPagto.DescriçãoPagto,
                          PedidosStatus.Status
                   FROM pedidos pe
                   LEFT JOIN produtos pr ON pe.produto = pr.estoque_codigo
                   LEFT JOIN clientes ON pe.cliente = clientes.CodigoCliente
                   LEFT JOIN vendedores ON pe.vendedor = vendedores.código
                   LEFT JOIN TipoPedido ON pe.TipoPedido = TipoPedido.Codigo
                   LEFT JOIN TipoProduto ON pr.TipoProduto = TipoProduto.Código
                   LEFT JOIN FormaPagto ON pe.FormaPagto = FormaPagto.CódigoPagto
                   LEFT JOIN PedidosStatus ON pe.StatusPedido = PedidosStatus.Codigo
                   WHERE pe.número = ${numero}
                   ORDER BY lançamento`

    // first item is always the "pedido" summary, other items are the "produtos" from that "pedido"
    const [pedido, ...produtos] = await connection.query(query)
    const result = {
      id: pedido['número'],
      tipoPedido: pedido['Tipo'].trim(),
      cliente: {
        id: pedido['cliente'],
        nome: pedido['RazaoSocial']
      },
      vendedor: {
        id: pedido['vendedor'],
        nome: pedido['nome']
      },
      quantidade: pedido['qte'],
      valor: pedido['valor'],
      data: pedido['data'],
      hora: pedido['hora'],
      status: pedido['Status'],
      formaPagamento: pedido['FormaPagto'],
      descricaoPagamento: pedido['DescriçãoPagto'],
      observacao: pedido['obs'],
      produtos: produtos.map((produto) => ({
        id: produto['produto'],
        tipoProduto: produto['Descrição'],
        quantidade: produto['qte'],
        valor: produto['valor'],
        descricao: produto['estoque_descrição']
      }))
    }

    return result
  }

  return {get, getProdutos}
}
