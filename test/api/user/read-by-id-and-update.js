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
    describe('read-by-id-and-update', () => {
      let globalAuth

      before(async () => {
        globalAuth = await mockData.mockAuthAndUser()
      })

      it('should fail with invalid auth', () => {
        return agent.client().put(`/user/${globalAuth.user}`).expect(401).promise()
      })

      //Current user must match the userid in the url
      it('should fail if current user does not match userid in url', () => {
        let invalidUserId = 'invalidUserId'

        return agent.client().put(`/user/${invalidUserId}`).set('authorization', globalAuth.token).expect(403).promise()
      })

      it('should add user', async () => {
        const mockBody = {
          firstName: 'Jane',
          lastName: 'Doe',
          email: `${mockData.uuid()}@test.com`
        }

        const user = await agent
          .client()
          .put(`/user/${globalAuth.user}`)
          .set('authorization', globalAuth.token)
          .send(mockBody)
          .expect(200)
          .promise()
        should.exist(user)
        user.id.should.equal(globalAuth.user)
        user.should.match(mockBody)

        const updateBody = {
          lastName: 'Smith'
        }

        const updatedUser = await agent
          .client()
          .put(`/user/${globalAuth.user}`)
          .set('authorization', globalAuth.token)
          .send(updateBody)
          .expect(200)
          .promise()
          updatedUser.id.should.equal(globalAuth.user)
        updatedUser.should.match({
          ...mockBody,
          ...updateBody
        })
      })
    })
  })
})
