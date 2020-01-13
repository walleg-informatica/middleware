module.exports = function faturaRepository(connection) {
  const get = async(id) => {
    const query = `select chave,nfiscal,codfor,forn_razao from entradas,fornecedores where codfor=forn_codigo`
    return await connection.query(query)
  }

  const getItems = async({ id , codfor }) => {
    const query = `select coditem, qte, estoque_codbarras
                   from itens_in i
                   INNER JOIN produtos p ON p.estoque_codigo = i.coditem 
                   where nfiscal='${id}' and codfor=${codfor}`

    return await connection.query(query)
  }


  return { get, getItems }
}
