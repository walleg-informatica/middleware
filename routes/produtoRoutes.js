module.exports = function produtoRoutes(app, repository) {
  app.get('/produto/', async(req,res) => {
    const { codigo, codigoDeBarras }= req.query
    res.send(await repository.get({ codigo, codigoDeBarras }))
  })
}