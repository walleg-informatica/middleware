module.exports = function statusPedidoRepository(connection) {
  const get = async() => {
    const query = `SELECT Codigo, Status FROM statuspedido ORDER BY Codigo`
    const result = await connection.query(query)
    return result.map((status) => ({
      id: status['Codigo'],
      status: status['Status']
    }))
  }

 
  return { get }
}
