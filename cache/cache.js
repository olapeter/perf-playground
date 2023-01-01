const defaultExpiry = 10;
const staleExpiry = 30;
const shortExpiry = 4;
class AppCache {

    entries;

    constructor(){
        this.entries = []
    }

    add = function(key, value, expiry){

        this.entries = this.entries.filter(entry => entry.key != key)

        let expiryTs = new Date().getTime()+expiry*1000
        this.entries.push(
            {
                "key": key,
                "value": value,
                "expiry": expiryTs
            }
        )
        console.log(new Date().toISOString(), "added", key, value, "with expiry", new Date(expiryTs).toISOString())
    }
    get = function(key){
        for(let entry of this.entries){
            if(entry && entry.key == key){
                if(new Date().getTime() < entry.expiry){
                    console.log(new Date().toISOString(), "found", key)
                    return entry.value
                } else {
                    this.entries = this.entries.filter(entry => entry.key != key)
                    console.log(new Date().toISOString(), "getDeleted", key)
                }             
            }
        }
        return null
    }
}

let _appCache = new AppCache()

function getOrAddAsync(key){

    let shortKey = key+"-short";

    if(shortCacheValue =_appCache.get(shortKey)){
        console.log(new Date().toISOString(), 'from short', shortCacheValue)
        return shortCacheValue
    } else if(defaultCacheValue = _appCache.get(key)){
        console.log(new Date().toISOString(), 'from default', defaultCacheValue)
        return defaultCacheValue
    } else {
        let newValue = fetchAndUpdate(key)
        _appCache.add(shortKey, newValue, shortExpiry)
        return newValue
    }

}

function fetchAndUpdate(key){
    let staleKey = key+"-stale";

    let coldStorageValue = getFromStorage()
    
    if(staleValue = _appCache.get(staleKey)){
        _appCache.add(key, coldStorageValue, defaultExpiry)
        _appCache.add(staleKey, coldStorageValue, staleExpiry)
        console.log(new Date().toISOString(), 'from stale', staleValue)
        return staleValue
    }

    _appCache.add(key, coldStorageValue, defaultExpiry)
    _appCache.add(staleKey, coldStorageValue, staleExpiry)
    console.log(new Date().toISOString(), 'from cold', coldStorageValue)
    return coldStorageValue

}
let counter = 0;
async function getFromStorage(){
    console.log(new Date().toISOString(), 'storage entry')
    if(counter>0){
        let sleepTime = Math.random()*5000
        console.log(new Date().toISOString(), 'storage sleep', sleepTime)
        await sleep(sleepTime)
    }
    counter=counter+1
    console.log(new Date().toISOString(), 'storage return')
    return `storedObject_${new Date().getSeconds()}`
}

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
  
async function run(){
    for(let i=0;i<15;i++){
        console.log(new Date().toISOString(), "got", await getOrAddAsync('mykey'))
        await sleep(2000)
    }
}
run()