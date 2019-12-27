module.exports = function produtoRoutes(app, repository) {
  app.get('/statusPedido', async(req,res) => {
    res.send(await repository.get(req.params.numero))
  })
}