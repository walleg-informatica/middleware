const sql = require('mssql')

const connect = async() => {
  const request = new sql.Request()
    request.on('info', info => {
        console.dir(info)
  })
  return sql.connect(`mssql://${username}:${password}@${localhost}/${database}`)
}

const executeQuery = async(query) => {
  return sql.query(query)
}

module.exports = {connect, executeQuery}
