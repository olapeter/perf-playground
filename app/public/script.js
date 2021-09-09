async function fetchWithTimeout(resource, options = {}) {
    const { timeout = 8000 } = options;

    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    const response = await fetch(resource, {
        ...options,
        signal: controller.signal
    });
    clearTimeout(id);

    return response;
}

async function isAlive() {
    try{
        const response = await fetchWithTimeout('/ping', {
            timeout: 2000
        })
        const json = await response.json()
        document.querySelector("#pingpong").textContent = `Backend says: ${json.pong} at ${Date(json.ts).toLocaleString()}`
    } catch(e){
        document.querySelector("#pingpong").textContent = "Backend dead :("
    }
}

setInterval(isAlive, 3000)