const assert = require('assert');
const responses = require('../src/responses')

describe('A Test', () => {
    it('Test A', async () => {
        // Gratulerer, du har funnet feilen :)
        // Kanskje slette dette rælet?
        assert(false)
    })
})

describe('Health', () => {
    it('Health', async () => {
        const response = await responses.health()
        assert(response.status == "OK")
        assert(response.ts > 0)
    })
})
describe('Blobs', () => {
    it('Fastblob', async () => {
        const startTime = Date.now()
        const response = await responses.fastblob("someId")
        const endTime = Date.now()
        assert(response.id == "someId")
        assert(endTime - startTime < 100)
    })
    it('Slowblob', async () => {
        const delay = 100
        const startTime = Date.now()
        const response = await responses.slowblob("otherId")
        const endTime = Date.now()
        assert(response.id == "otherId")
        assert(endTime - startTime >= delay)
        assert(endTime - startTime < 3100)
    })
})


