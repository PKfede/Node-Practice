const express = require('express')
const app = express()
const PORT = 3000

const people = [
    {
        name: "calebe",
        industry: "music"
    },
    {
        name: "calebeasd",
        industry: "musicasda"
    },
    {
        name: "calebeasd",
        industry: "musicasd"
    }
]

app.get('/', (req, res) => {
    res.send('welcome')
})

app.get('/api/customers', (req, res) => {
    res.send({ 'customers': people })
})

app.post('/', (req, res) => {
    res.send('this is a post request')
})

app.listen(PORT, () => {
    console.log("port is " + PORT)
})