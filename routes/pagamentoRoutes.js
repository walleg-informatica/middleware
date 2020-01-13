module.exports = function faturaRoutes(app, repository) {
  app.get('/pagamentos/:date1/:date2', async(req,res) => {
    const { date1 , date2 } = req.params
    res.send(await repository.get({ date1 , date2 }))
  })
}