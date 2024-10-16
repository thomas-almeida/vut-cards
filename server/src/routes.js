import { Router } from 'express'
import userCardController from '../controllers/userCardController.js'

const api = Router()

// get tracker data
api.get('/mvp/get-card-data/:name/:code', userCardController.getUserTrackerData)
api.get('/mvp/get-alfa-testers', userCardController.getAlfaUsers)

export default api