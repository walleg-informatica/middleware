
module.exports = function produtoRepository(connection) {
  const get = async({ codigo, codigoDeBarras }) => {
    const whereField = codigoDeBarras ? 'estoque_codbarras' : 'estoque_codigo'

    const query = `select estoque_codigo,estoque_descrição,(estoque_anterior+entradas-saídas) as estoque, estoque_codbarras, estoque_tabela
                   from produtos
                   where ${whereField}='${codigoDeBarras || codigo}'`

    const produtos = await connection.query(query)
    return produtos
  }

  return { get }
}
