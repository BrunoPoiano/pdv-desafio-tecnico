import { Router } from 'express'
import { ResponsibleController } from '../../controller/ResponsibleController'

const responsibleRouter = Router()

responsibleRouter.get('/', ResponsibleController.list)

export default responsibleRouter
