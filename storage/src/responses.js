sleep = ms => new Promise(res => setTimeout(res, ms));

async function health() {
    return {
        "status": "OK",
        "version": "1",
        "ts": Date.now()
    }
}

async function fastblob(id) {
    return {
        "id": id,
        "data": "Dette er noe blob data som kommer raskt"
    }
}

async function slowblob(id) {
    const delay = Math.random() * 1500
    await sleep(delay > 100 ? delay : 100)
    return {
        "id": id,
        "data": `Dette er noe blob data som er ${delay}ms forsinket`
    }
}

module.exports = {
    health,
    fastblob,
    slowblob
}
