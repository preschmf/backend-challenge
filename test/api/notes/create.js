let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('notes', () => {
    describe('create', () => {
      let globalAuth
      let invalidToken = 'invalidToken'
      let mockBody = {
        title: 'Test Note',
        message: 'Test message.',
      }

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail if user is not logged in at all', () => {
        return agent.client().post(`/note`).send(mockBody).expect(401).promise()
      })

      it('should fail if user is not logged in and registered', () => {
        return agent.client().post(`/note`).send(mockBody).set('authorization', invalidToken).expect(401).promise()
      })

      it('should create a note', async () => {
        const note = await agent
          .client()
          .post(`/note`)
          .send(mockBody)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(note)
        note.title.should.equal(mockBody.title)
        note.message.should.equal(mockBody.message)
      })
    })
  })
})
