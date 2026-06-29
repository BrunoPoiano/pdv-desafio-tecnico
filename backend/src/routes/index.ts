import { Router } from 'express'
import apiHealth from './health'
import stationRouter from './stations'
import responsibleRouter from './responsible'

const router = Router()

router.use('/health', apiHealth)
router.use('/station', stationRouter)
router.use('/responsible', responsibleRouter)

export default router
