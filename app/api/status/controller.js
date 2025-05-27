const mongodb = require('app/lib/mongodb')

exports.currentStatus = function (req, res) {
  let message = 'connected'
  
  switch (mongodb.readyState) {
    case mongodb.ReadyStates.connected:
      res.status(200).send({
        status: 'OK',
        message
      })
      return
    case mongodb.ReadyStates.connecting:
      message = 'connecting'
      break
    case mongodb.ReadyStates.disconnected:
      message = 'disconnected'
      break
    case mongodb.ReadyStates.disconnecting:
      message = 'disconnecting'
      break
    default:
      message = 'disconnected'
  }
  res.status(500).send({
    status: 'ERROR',
    message
  })
}
