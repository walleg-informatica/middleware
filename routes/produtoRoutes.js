module.exports = function produtoRoutes(app, repository) {
  app.get('/produto/:numero', async(req,res) => {
    res.send(await repository.get(req.params.numero))
  })
}