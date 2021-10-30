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
    try {
        const response = await fetchWithTimeout('/health', {
            timeout: 2000
        })
        const json = await response.json()
        if (json.status == "OK") {
            document.querySelector("#status").textContent = `SystemStatus: ${json.status} at ${new Date(json.ts).toISOString()}`
            document.querySelector("#status").className = 'statusok'
            document.querySelector("#statusmessages").textContent = ""
        } else if (json.status == "WARNING") {
            document.querySelector("#status").textContent = `SystemStatus: ${json.status} at ${new Date(json.ts).toISOString()}`
            document.querySelector("#status").className = 'statuswarn'
            document.querySelector("#statusmessages").textContent = json.warnings.join('\n')
        } else if (json.status == "ERROR") {
            document.querySelector("#status").textContent = `SystemStatus: ${json.status} at ${new Date(json.ts).toISOString()}`
            document.querySelector("#status").className = 'statuserr'
            document.querySelector("#statusmessages").textContent = json.errors.join('\n')
        }
    } catch (e) {
        document.querySelector("#status").innerHTML = "&#128128; Sørver'n har dævva &#128128;"
        document.querySelector("#status").className = 'statusdead'
        document.querySelector("#statusmessages").textContent = ""
    }
}

setInterval(isAlive, 3000)