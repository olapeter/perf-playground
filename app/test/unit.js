const assert = require('assert');
const internal = require('stream');

const simpleresponses = require('../src/simpleresponses')
const auth = require('../src/auth')

describe('Ping', () => {
    it('Pong', async () => {
        const response = await simpleresponses.pong()
        assert(response.pong == "I'm alive!")
        assert(response.ts > 0)
    })
})
describe('Delay', () => {
    it('50ms', async () => {
        const delay = 50
        const startTime = Date.now()
        const response = await simpleresponses.simpleDelay(delay)
        const endTime = Date.now()
        assert(response.delayed == delay)
        assert(endTime - startTime >= delay)
        assert(endTime - startTime < delay + 20)
    })
    it('100ms', async () => {
        const delay = 100
        const startTime = Date.now()
        const response = await simpleresponses.simpleDelay(delay)
        const endTime = Date.now()
        assert(response.delayed == delay)
        assert(endTime - startTime >= delay)
        assert(endTime - startTime < delay + 20)
    })
})
describe('Random Delay', () => {
    it('50ms, 100%', async () => {
        const delay = 50
        const startTime = Date.now()
        const response = await simpleresponses.randomDelay(delay, 100)
        const endTime = Date.now()
        assert(response.delayed == delay)
        assert(endTime - startTime >= delay)
        assert(endTime - startTime < delay + 20)
    })
    it('50ms, 0%', async () => {
        const delay = 50
        const startTime = Date.now()
        const response = await simpleresponses.randomDelay(delay, 0)
        const endTime = Date.now()
        assert(response.delayed == 0)
        assert(endTime - startTime < 20)
    })
})

describe('Auth', () => {
    it('Missing credentials', async () => {
        const token = await auth.token({"user": "", "pass": ""})
        assert(token == null)
    })
    it('Wrong credentials', async () => {
        const token = await auth.token({"user1": "", "pass": "invalid"})
        assert(token == null)
    })
    it('Correct credentials', async () => {
        const token = await auth.token({"user": "user1", "pass": "111"})
        assert(token.accessToken.startsWith("dfgsdgf.user1."))
    })
    it('Valid token', async () => {
        const response = await auth.token({"user": "user1", "pass": "111"})
        const validated = await auth.validate(response.accessToken)
        assert(validated == true)
    })
    it('Invalid token', async () => {
        const validated = await auth.validate("foo.bar.invalid")
        assert(validated == false)
    })
    it('No token', async () => {
        const validated = await auth.validate(null)
        assert(validated == false)
    })
})


