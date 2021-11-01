const assert = require('assert');

const Auth = require('../src/auth')
const HealthCheck = require('../src/health')
const HttpClient = require('../src/httpClient')
const SimpleResponses = require('../src/simpleresponses')
const StorageRepository = require('../src/storageRepository')

const auth = new Auth()
const simpleResponses = new SimpleResponses()

describe('Health', () => {
    it('isHealthy', async () => {
        httpClientMock = new HttpClient()
        httpClientMock.json = async () => { return {"status": "OK"} }
        
        const healthCheck = new HealthCheck(httpClientMock)
        const response = await healthCheck.health()
        assert(response.status == "OK")
    })
    it('Timeout error', async () => {
        httpClientMock = new HttpClient()
        httpClientMock.json = async () => { return {"status": "timeouterr"} }
        
        const healthCheck = new HealthCheck(httpClientMock)
        const response = await healthCheck.health()
        assert(response.status == "ERROR")
    })
    it('Connection error', async () => {
        httpClientMock = new HttpClient()
        httpClientMock.json = async () => { return {"status": "connectionerr"} }
        
        const healthCheck = new HealthCheck(httpClientMock)
        const response = await healthCheck.health()
        assert(response.status == "ERROR")
    })
    it('Unknown status', async () => {
        httpClientMock = new HttpClient()
        httpClientMock.json = async () => { return {"status": "unknown"} }
        
        const healthCheck = new HealthCheck(httpClientMock)
        const response = await healthCheck.health()
        assert(response.status == "WARNING")
    })
})

describe('Blob storage', () => {
    it('Fast blob', async () => {
        httpClientMock = new HttpClient()
        httpClientMock.json = async () => { return {"id": "testid"} }
        storageRepository = new StorageRepository(httpClientMock)
        const response = await storageRepository.fastBlob("testid")
        assert(response.id == "testid")
    })
    it('Slow blob', async () => {
        httpClientMock = new HttpClient()
        httpClientMock.json = async () => { return {"id": "testid"} }
        storageRepository = new StorageRepository(httpClientMock)
        const response = await storageRepository.slowBlob("testid")
        assert(response.id == "testid")
    })
    it('Slow blob with retry', async () => {
        httpClientMock = new HttpClient()
        httpClientMock.json = async () => { return {"status": "timeouterr"} }
        storageRepository = new StorageRepository(httpClientMock)
        const response = await storageRepository.slowBlobWithRetry("testid")
        assert(response.status == "timeouterr")
        assert(response.retryCount == 5)
    })
})

describe('Simple Delay', () => {
    it('50ms', async () => {
        const delay = 50
        const startTime = Date.now()
        const response = await simpleResponses.simpleDelay(delay)
        const endTime = Date.now()
        assert(response.delayed == delay)
        assert(endTime - startTime >= delay)
        assert(endTime - startTime < delay + 20)
    })
    it('100ms', async () => {
        const delay = 100
        const startTime = Date.now()
        const response = await simpleResponses.simpleDelay(delay)
        const endTime = Date.now()
        assert(response.delayed == delay)
        assert(endTime - startTime >= delay)
        assert(endTime - startTime < delay + 20)
    })
})
describe('Simple Random Delay', () => {
    it('50ms, 100%', async () => {
        const delay = 50
        const startTime = Date.now()
        const response = await simpleResponses.randomDelay(delay, 100)
        const endTime = Date.now()
        assert(response.delayed == delay)
        assert(endTime - startTime >= delay)
        assert(endTime - startTime < delay + 20)
    })
    it('50ms, 0%', async () => {
        const delay = 50
        const startTime = Date.now()
        const response = await simpleResponses.randomDelay(delay, 0)
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


