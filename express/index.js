import express from 'express'
import cors from 'cors'
import jobs from './jobs.json' with { type: 'json' }
import { randomUUID } from 'node:crypto'
import { DEFAULTS } from './config.js'

const PORT = process.env.PORT ?? DEFAULTS.PORT

const app = express()

const ACCEPTED_ORIGINS = [
    'http://localhost:5173'
]

app.use(cors({
    origin: (origin, callback) => {
        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        } 
        return callback(new Error('Not allowed by CORS'))
    }
}))

app.use((req, res, next) => {
    const timeString = new Date().toLocaleTimeString()
    console.log(`${timeString} - ${req.method} ${req.url}`)
    next()
})

app.use(express.json())

app.get('/', (req, res) => {
    return res.send('Hello World!')
})

app.get('/health', (req, res) => {
    return res.json({
        status: 'OK',
        uptime: process.uptime()
    })
})

app.get('/jobs', (req, res) => {
    const { text, type, level, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET } = req.query

    let filteredJobs = jobs

    if (text) {
        const searchTerm = text.toLowerCase()
        filteredJobs = filteredJobs.filter(job =>
          job.titulo.toLowerCase().includes(searchTerm) ||
          job.descripcion.toLowerCase().includes(searchTerm))
    }

    if (technology) {
        filteredJobs = filteredJobs.filter(job => job.data.technology.includes(technology))
    }

    if (level) {
        filteredJobs = filteredJobs.filter(job => job.data.nivel.includes(level))
    }

    if (type) {
        filteredJobs = filteredJobs.filter(job => job.data.modalidad.includes(type))
    }

    const limitNumber = Number(limit)
    const offsetNumber = Number(offset)

    const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber)

    return res.json({ data: paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber})
})

app.get('/jobs/:id', (req, res) => {
    const { id } = req.params
    
    const job = jobs.find(job => job.id === id)

    if (!job) return res.status(404).json({ message: 'Job not found' })

    return res.json(job)
})

app.post('/jobs', (req, res) => {
    const { titulo, empresa, ubicacion, descripcion, data } = req.body

    const newJob = {
        id: randomUUID(),
        titulo,
        empresa,
        ubicacion,
        descripcion,
        data,
    }

    jobs.push(newJob)

    return res.status(201).json(newJob)
})

app.patch('/jobs/:id', (req, res) => {
    const { id } = req.params
    const { titulo, empresa, ubicacion, descripcion, data } = req.body

    const jobIndex = jobs.findIndex(job => job.id === id)

    if (jobIndex === -1) return res.status(404).json({ message: 'Job not found' })

    const updatedJob = {
        ...jobs[jobIndex],
        titulo: titulo ?? jobs[jobIndex].titulo,
        empresa: empresa ?? jobs[jobIndex].empresa,
        ubicacion: ubicacion ?? jobs[jobIndex].ubicacion,
        descripcion: descripcion ?? jobs[jobIndex].descripcion,
        data: data ?? jobs[jobIndex].data
    }

    jobs[jobIndex] = updatedJob

    return res.json(updatedJob)
})

app.delete('/jobs/:id', (req, res) => {
    const { id } = req.params

    const jobIndex = jobs.findIndex(job => job.id === id)

    if (jobIndex === -1) return res.status(404).json({ message: 'Job not found' })

    jobs.splice(jobIndex, 1)

    return res.status(204).json({ message: 'Job deleted' })
})


app.listen(PORT, () => {
    console.log(`Servidor levantado en http://localhost:${PORT}`)
})