module.exports = function faturaRoutes(app, repository) {
  app.get('/entrada/:id', async(req,res) => {
    res.send(await repository.get(req.params.id))
  })

  app.get('/entrada/:id/:codfor', async(req,res) => {
    const { id, codfor } = req.params
    res.send(await repository.getItems({ id, codfor }))
  })

}