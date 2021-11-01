module.exports = class StorageResponses {

    sleep = ms => new Promise(res => setTimeout(res, ms));

    async health() {
        return {
            "status": "OK",
            "version": "1",
            "ts": Date.now()
        }
    }

    async fastblob(id) {
        return {
            "id": id,
            "data": "Dette er noe blob data som kommer raskt"
        }
    }

    async slowblob(id) {
        const delay = Math.floor(Math.random() * 1500)
        await this.sleep(delay > 100 ? delay : 100)
        return {
            "id": id,
            "data": `Dette er noe blob data som er ${delay}ms forsinket`
        }
    }
}
