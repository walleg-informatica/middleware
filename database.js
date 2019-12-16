var sql = require('tedious');

const connect = () => new Promise((resolve, reject) => {
  const connection = new sql.Connection({
    server: process.env.DATABASE_HOST,
    options:{
      port: parseInt(process.env.DATABASE_PORT)
    },
    authentication: {
      type: "default",
      options: {
        userName: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
      }
    }
  })

  connection.on('connect', function(err) {
    return resolve({
      connection,
      query: query(connection)
    })
  })

  connection.on('error', function(err) {
    reject(err)
  })
})

const query = (connection) => (queryString) => new Promise((resolve, reject) => {
  const request = new sql.Request(queryString, function(err, count, rows) {
    if (err) {
      reject(err);
    }
  })

  const rows = []
  request.on('row', function(columns) {
    const obj = {}
    columns.forEach((c) => obj[c.metadata.colName] = c.value)
    rows.push(obj)
  })

  request.on('error', (err) => reject(err));
  request.on('done', (rowCount, more, rows) => console.log('done', rows));

  request.on('requestCompleted', () => {
    resolve(rows)
  })

  connection.execSql(request)
})

module.exports = { connect }
