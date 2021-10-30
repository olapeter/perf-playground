const httpClient = require('bent')

module.exports = {
    health
}

async function health() {

    const appIsOk = { //bare for å demonstrere konseptet med flere helsesjekker
        "error": null,
        "warning": null
    }
    const storageIsOk = await isStorageAlive()

    const errors = []
    if (appIsOk.error) errors.push(appIsOk.error)
    if (storageIsOk.error) errors.push(storageIsOk.error)

    const warnings = []
    if (appIsOk.warning) warnings.push(appIsOk.warning)
    if (storageIsOk.warning) warnings.push(storageIsOk.warning)

    let status = null
    if (warnings.length > 0) status = "WARNING"
    else if (errors.length > 0) status = "ERROR"
    else status = "OK"

    return {
        "status": status,
        "errors": errors,
        "warnings": warnings,
        "ts": Date.now()
    }
}

async function isStorageAlive() {
    const storageHost = process.env.ISCONTAINER ? 'http://storage:8888' : 'http://127.0.0.1:8888'

    let error = null
    let warning = null

    const timeout = new Promise((res) => setTimeout(() => res({ "status": "timeouterr" }), 1000));

    const wrapPromise = (promise) => Promise.race([promise, timeout]);

    const json = await wrapPromise(httpClient('json')(storageHost + "/health").catch(() => { return { "status": "connectionerr" } }))


    if (json) {
        if (json.status == "OK") {
            //all is dandy
        } else if (json.status == "connectionerr") {
            error = "Could not connect to storage at all"
        } else if (json.status == "timeouterr") {
            error = "Could not connect to storage within reasonable time"
        } else {
            warning = "Storage is sick"
        }
    } else {
        error = "Something is very bad with the storage"
    }

    return {
        "error": error,
        "warning": warning
    }
}
