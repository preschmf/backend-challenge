const controller = require('./controller')

module.exports = (router) => {
  router.get('/status', async (req, res) => {
    controller.currentStatus(req, res)
  })
}
