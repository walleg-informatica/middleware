module.exports = function faturaRoutes(app, repository) {
  app.get('/fatura/:numero', async(req,res) => {
    res.send(await repository.get(req.params.numero))
  })
}