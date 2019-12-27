module.exports = function faturaRepository(connection) {
  const get = async() => {
    const query = `SELECT TOP 50 número, (
                      SELECT TOP 1 valor FROM pedidos p2 WHERE
                      p1.número = p2.número 
                   ) AS valor
                   FROM pedidos p1
                   GROUP BY número
                   ORDER BY número DESC`

    const fatura = await connection.query(query)
    return fatura
  }


  return { get }
}
