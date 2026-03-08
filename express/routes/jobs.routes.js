// routes/jobs.routes.js

import { Router } from 'express'
import { JobController } from '../controllers/jobs.controller.js'
import { validateJob, validatePartialJob } from '../schemas/jobs.schema.js'

export const jobsRouter = Router()

function validateCreate(req, res, next) {
    const result = validateJob(req.body)
    if(result.success) {
        req.body = result.data // machacamos los datos: vamos a tener los datos validados y limpios
        return next()        
    } 

    return res.status(400).json({ error: 'Invalid request', details: result.error.errors})
}

function validateUpdate(req, res, next) {
    const result = validatePartialJob(req.body)
    if(result.success) {
        req.body = result.data // machacamos los datos: vamos a tener los datos validados y limpios
        return next()        
    } 

    return res.status(400).json({ error: 'Invalid request', details: result.error.errors})
}

jobsRouter.get('/', JobController.getAll)
jobsRouter.get('/:id', JobController.getById)
jobsRouter.post('/', validateCreate, JobController.create)
jobsRouter.patch('/:id', validatePartialJob, JobController.update)
jobsRouter.delete('/:id', JobController.delete)

