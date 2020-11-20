const lambda = require('../../../src/handlers/index.js')

describe('test index.handler', function () {
    it('verifies successful response', async () => {
        const result = await lambda.handler()
        const statusCode = result.statusCode
        const expectedStatusCode = 200
        expect(statusCode).toEqual(expectedStatusCode)
    })
})
