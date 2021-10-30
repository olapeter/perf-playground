const express = require('express')
const path = require('path')
const app = express()
app.use(express.json());
const auth = require('./auth')
const health = require('./health')
const simpleresponses = require('./simpleresponses')

app.get('/', function (_, res) {
    const options = {
        root: path.join(__dirname, '../public'),
        headers: {
            'Content-Type': 'text/html;charset=utf-8',
        }
    }

    const fileName = 'index.html';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            console.log(err.message)
        }
    })
})

app.get('/health', async function (_, res) {
    res.json(await health.health())
})

app.get('/file/:name', function (req, res) {
    const options = {
        root: path.join(__dirname, '../public'),
        dotfiles: 'deny'
    }

    const fileName = req.params.name;
    res.sendFile(fileName, options, function (err) {
        if (err) {
            log.error(err.message)
        }
    })
})

app.get('/delay/:delay', async function (req, res) {
    res.json(await simpleresponses.simpleDelay(req.params.delay))
})

app.get('/delay/:delay/:percentage', async function (req, res) {
    res.json(await simpleresponses.randomDelay(req.params.delay, req.params.percentage))
})

app.post('/auth/token', async function(req, res){
    const token = await auth.token(req.body);
    if(token){
        res.json(token)
    } else {
        res.status(403).send("<!doctype html><h1>Invalid credentials</h1>")
    }
})

app.get('/authenticatedendpoint', async function (req, res){
    const isValid = await auth.validate(req.headers.authorization)
    if(isValid){
        res.json({"result": "success"})
    }else{
        res.status(403).send("<!doctype html><h1>Nei, nei, nei</h1>")
    }
})

const port = 7777
app.listen(port)

console.log(`Started app service, listening on port ${port}`)