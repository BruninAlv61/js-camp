import express from 'express'

const PORT = process.env.PORT ?? 1234

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

app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})