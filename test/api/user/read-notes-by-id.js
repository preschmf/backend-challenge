let should
let agent
let mockData

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
  mockData = require('test/lib/mock-data')
})

describe('api', () => {
  describe('user', () => {
    describe('read-notes-by-id', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail with invalid auth', () => {
        return agent.client().get(`/user/${globalAuth.user}/notes`).expect(401).promise()
      })

      it('should read notes for user', async () => {
        // Create multiple notes for the user to check query
        globalAuth = await mockData.mockAuthAndUser({notes: [await mockData.mockNote(), await mockData.mockNote()]})

        const notes = await agent
          .client()
          .get(`/user/${globalAuth.user}/notes`)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        should.exist(notes)
        notes.length.should.equal(2)
      })

      it('should return empty array if user has no notes', async () => {
        // User with no notes
        globalAuth = await mockData.mockAuthAndUser()
        
        const notes = await agent
          .client()
          .get(`/user/${globalAuth.user}/notes`)
          .set('authorization', globalAuth.token)
          .expect(200)
          .promise()
        notes.should.be.an.Array()
        notes.length.should.equal(0)

      })
    })
  })
})
