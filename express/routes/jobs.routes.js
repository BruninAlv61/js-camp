// routes/jobs.routes.js

import { Router } from 'express'
import { JobController } from '../controllers/jobs.controller.js'

export const jobsRouter = Router()

jobsRouter.get('/', JobController.getAll)
    
jobsRouter.get('/:id', JobController.getById)

jobsRouter.post('/', JobController.create)
  
jobsRouter.patch('/:id', JobController.update)
 
jobsRouter.delete('/:id', JobController.delete)

