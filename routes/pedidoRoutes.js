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
  console.log('dog', repository)
   app.post('/pedido/alterar-status/:numero', async(req,res) => {
     const id = req.params.numero
     const { status } = req.body

     console.log(req.body)
     
     console.log('status', status, id)

     
     res.send(await repository.update(id, { status }))
   })
}