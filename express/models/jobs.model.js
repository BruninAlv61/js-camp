// models/jobs.model.js

import jobs from '../jobs.json' with { type: 'json'}
import { randomUUID } from 'node:crypto'

export class JobModel {
    static async getAll({ text, type, level, technology, limit = 10, offset = 0 }) {
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
    
        return paginatedJobs
    }

    static async getById({ id }) {
        const job = jobs.find(job => job.id === id)
        return job        
    }

    static async create ({ titulo, empresa, ubicacion, descripcion, data}) {
        const newJob = {
            id: randomUUID(),
            titulo,
            empresa,
            ubicacion,
            descripcion,
            data,
        }

        jobs.push(newJob)

        return newJob
    }

    static async update ({id, body}) {
        const { titulo, empresa, ubicacion, descripcion, data } = body

        const jobIndex = jobs.findIndex(job => job.id === id)

        if (jobIndex === -1) return null

        const updatedJob = {
            ...jobs[jobIndex],
            titulo: titulo ?? jobs[jobIndex].titulo,
            empresa: empresa ?? jobs[jobIndex].empresa,
            ubicacion: ubicacion ?? jobs[jobIndex].ubicacion,
            descripcion: descripcion ?? jobs[jobIndex].descripcion,
            data: data ?? jobs[jobIndex].data
        }

        jobs[jobIndex] = updatedJob
        return updatedJob
    }

    static async delete ({ id }) {
        const jobIndex = jobs.findIndex(job => job.id === id)

        if (jobIndex === -1) return null

        return jobs.splice(jobIndex, 1)
    }
}