module.exports = function pedidoRoutes(app, repository) {
  app.get('/pedido', async(req, res) => {
    res.send(await repository.get())

   /* repository.get()
    .then((produtos) => {
      res.send(produtos)
    })
    */
  })
}

