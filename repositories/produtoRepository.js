
module.exports = function produtoRepository(connection) {
  const get = async(codigoProduto) => {
    const query = `select estoque_codigo,estoque_descrição,(estoque_anterior+entradas-saídas) as estoque, estoque_codbarras, estoque_tabela
                   from produtos
                   where estoque_codbarras='${codigoProduto}'`

    const produtos = await connection.query(query)
    return produtos
  }

  return { get }
}
