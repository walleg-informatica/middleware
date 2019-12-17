module.exports = function pedidoRoutes(app, repository) {
  app.get('/pedido', async(req, res) => {
    res.send(await repository.get())
    
   /* repository.get()
    .then((produtos) => {
      res.send(produtos)
    })
    */
  })

  app.get('/pedido/:numero', async(req,res) => {
    res.send(await repository.getProdutos(req.params.numero))
  })
}