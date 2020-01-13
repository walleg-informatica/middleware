module.exports = function faturaRepository(connection) {
  const get = async({ date1, date2}) => {
    const query = `select numerotitulo as documento, vencimento,valor,forn_razao as fornecedor
                  from pagamento,fornecedores
                  where idfornecedor=fornecedores.forn_codigo
                  and vencimento >= '${date1}'
                  and vencimento <= '${date2}'
                  and pagamento IS NULL
                  ORDER BY vencimento`


    const fatura = await connection.query(query)
    return fatura
  }


  return { get }
}
