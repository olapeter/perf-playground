const bent = require('bent')

module.exports = class HttpClientWithTimeout {

    timeout = null

    constructor(timeout) {
        this.timeout = timeout ? timeout : 1000
    }

    async json(url) {
        const timeoutPromise = new Promise((res) => setTimeout(() => res({ "status": "timeouterr" }), this.timeout));

        const wrapPromise = (promise) => Promise.race([promise, timeoutPromise]);

        return await wrapPromise(bent('json')(url).catch(() => { return { "status": "connectionerr" } }))
    }

}