const express = require('express')
const responses = require('./responses')
const app = express()
app.use(express.json())

app.get('/', function (_, res) {
    res.contentType("text/plain").send("Storage root")
})

app.get('/health', async function (_, res) {
    res.json(await responses.health())
})

app.get('/fastblob/:id', async function (req, res) {
    res.json(await responses.fastblob(req.params.id))
})

app.get('/slowblob/:id', async function (req, res) {
    res.json(await responses.slowblob(req.params.id))
})

const port = 8888
app.listen(port)

console.log(`Started storage service, listening on port ${port}`)