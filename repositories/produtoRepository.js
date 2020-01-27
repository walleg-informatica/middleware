
module.exports = function produtoRepository(connection) {
  const get = async({ codigo, codigoDeBarras }) => {
    const whereField = codigoDeBarras ? 'estoque_codbarras' : 'estoque_codigo'

    const query = `select estoque_codigo,estoque_descrição,(estoque_anterior+entradas-saídas) as estoque, estoque_codbarras, estoque_tabela
                   from produtos
                   where ${whereField}='${codigoDeBarras || codigo}'`

    const produtos = await connection.query(query)
    if(produtos.length) {
      const [produto] = produtos
      return {
        id: produto['estoque_codigo'],
        codigoDeBarras: produto['estoque_codbarras'],
        estoque: produto['estoque'],
        tabela: produto['estoque_tabela'],
        descricao: produto['estoque_descrição'],
        version: 3
      }
    }
    return {}
  }

  return { get }
}
