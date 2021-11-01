module.exports = class SimpleResponses {

    sleep = ms => new Promise(res => setTimeout(res, ms));

    async simpleDelay(delay) {
        await this.sleep(delay)
        return {
            "delayed": delay
        }
    }

    async randomDelay(delay, percentage) {
        if (Math.random() * 100 > 100 - percentage) {
            await this.sleep(delay)
        } else {
            delay = 0
        }
        return {
            "delayed": delay
        }
    }
}