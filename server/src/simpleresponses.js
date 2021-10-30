sleep = ms => new Promise(res => setTimeout(res, ms));

async function simpleDelay(delay){
    await sleep(delay)
    return {
        "delayed": delay
    }
}

async function randomDelay(delay, percentage){
    if(Math.random()*100 > 100-percentage){
        await sleep(delay)
    } else {
        delay = 0
    }
    return {
        "delayed": delay
    }
}

module.exports = {
    simpleDelay,
    randomDelay
}