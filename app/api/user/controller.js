const userService = require('app/modules/user')
const notesService = require('app/modules/notes')

/**
 * @method read
 */
exports.read = async (req, res) => {
  const user = await userService.findById(req.params.id)
  if (!user) {
    return res.status(404).send({message: 'User not found'})
  }
  res.status(200).send(user)
}

/**
 * @method update
 */
exports.update = async (req, res) => {
  const user = await userService.findByIdAndUpdate(req.params.id, req.body)
  if (!user) {
    return res.status(404).send({message: 'User not found'})
  }
  res.status(200).send(user)
}

/**
 * @method readNotes
 */
exports.readNotes = async (req, res) => {
  const user = await userService.findById(req.params.id)
  if (!user) {
    return res.status(404).send({message: 'User not found'})
  }
  const notes = user.notes || []

  const notesDetails = await notesService.find({_id: {$in: notes}})

  res.status(200).send(notesDetails)
}