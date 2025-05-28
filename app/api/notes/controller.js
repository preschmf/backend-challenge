const notesService = require('app/modules/notes')
const userService = require('app/modules/user')
const mongoose = require('mongoose')

/**
 * @method read
 */
exports.read = async (req, res) => {
  const note = await notesService.findById(req.params.id)
  if (!note) {
    return res.status(404).send({ message: `Could not find note: ${req.params.id}` })
  }
  res.status(200).send(note)
}

/**
 * @method create
 */
exports.create = async (req, res) => {
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    const note = await notesService.create(req.body)
    if (!note) {
      throw new Error('Failed to create note')
    }

    let userId = req.userId
    let user = await userService.findByIdAndUpdate(
      userId,
      { $push: { notes: note.id } },
      { new: true, userFindAndModify: false }
    )
    if (!user) {
      throw new Error(`Failed to update notes for user: ${userId}`)
    }

    res.status(200).send(note)

  } catch (error) {
    console.error('Error during note creation:', error.stack)
    await session.abortTransaction()
    session.endSession()

    res.status(500).send({ message: error.message || 'Error during note creation' })
  }
}
