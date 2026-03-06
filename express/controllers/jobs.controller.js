// controller/jobs.controller.js

import { DEFAULTS } from '../config.js'
import { JobModel } from '../models/jobs.model.js'

export class JobController {
    static async getAll(req, res) {
        const { text, type, level, technology, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.LIMIT_OFFSET } = req.query
        
        const jobs = await JobModel.getAll({ text, type, level, technology, limit, offset })
        
        const limitNumber = Number(limit)
        const offsetNumber = Number(offset)
        
        return res.json({ data: jobs, total: jobs.length, limit: limitNumber, offset: offsetNumber})
    }

    static async getById(req, res) {
            const { id } = req.params

            const job = await JobModel.getById({ id })

            if (!job) return res.status(404).json({ message: 'Job not found' })
            
            return res.json(job)
    }

    static async create(req, res) {
        const { titulo, empresa, ubicacion, descripcion, data } = req.body

        const newJob = await JobModel.create({ titulo, empresa, ubicacion, descripcion, data })

        return res.status(201).json(newJob)
    }

    static async update(req, res) {
        const { id } = req.params
        const updatedJob = await JobModel.update( id, req.body)

        if (!updatedJob) return res.status(404).json({ message: 'Job Not Found'})

        return res.json(updatedJob)
    }

    static async delete(req, res) {
        const { id } = req.params

        const deletedJob = await JobModel.delete({ id })

        if (!deletedJob) return res.status(404).json({ message: 'Job not found' })

        return res.status(204).json({ message: 'Job deleted' })
    }
}