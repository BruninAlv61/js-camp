import express from 'express'
import { DEFAULTS } from './config.js'

const PORT = process.env.PORT ?? DEFAULTS.PORT

const app = express()

app.get('/', (req, res) => {
    return res.send('Hello World!')
})

app.get('/health', (req, res) => {
    return res.json({
        status: 'OK',
        uptime: process.uptime()
    })
})

// Opcional -> /acd o /abcd
app.get('/a{b}cd', (req, res) => {
    return res.send('abcd o acd')
})

// Comodin 
app.get('/bb*bb', (req, res) => {
    return res.send('bb*bb')
})

// Rutas más largas que no sabes como terminan
app.get('/file/*filename', (req, res) => {
    return res.send('file/*')
})

// Usar Regex
app.get(/.*fly$/, (req, res) => {
    return res.send('Terminando en fly')
})

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})