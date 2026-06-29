import { Router } from 'express'
import stationCsvRouter from './csv'
import { StationController } from '../../controller/station/StationController'

const stationRouter = Router()

stationRouter.use('/csv', stationCsvRouter)
stationRouter.get('/', StationController.list)

export default stationRouter
