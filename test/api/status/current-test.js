let should
let agent

before(() => {
  should = require('should')
  agent = require('test/lib/agent')
})

describe('api', () => {
  describe('status', () => {
    describe('current', () => {
      it('should get status', async () => {
        const result = await agent.client().get('/status').expect(200).promise()
        should.exist(result)
        result.status.should.equal('OK')
        result.message.should.equal('connected')
      })
    })
  })
})
