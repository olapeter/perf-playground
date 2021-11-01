const HttpClientWithTimeout = require('./httpClient')

module.exports = class StorageRepository {

    httpClient = null
    storageHost = process.env.ISCONTAINER ? 'http://storage:8888' : 'http://127.0.0.1:8888'

    constructor(client) {
        this.httpClient = client ? client : new HttpClientWithTimeout(500)
    }

    async fastBlob(id){
        return await this.httpClient.json(`${this.storageHost}/fastblob/${id}`)
    }

    async slowBlob(id){
        return await this.httpClient.json(`${this.storageHost}/slowblob/${id}`)
    }

    async slowBlobWithRetry(id){
        let success = false
        let blob = null
        let counter = 0
        while(counter < 5 && !success){
            blob = await this.httpClient.json(`${this.storageHost}/slowblob/${id}`)
            if(blob.status && blob.status == "timeouterr"){
                counter++
            } else {
                success = true
            }
        }
        blob.retryCount = counter
        return blob
    }

}