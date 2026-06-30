import express from 'express'
import cors from 'cors'
import router from './routes'
import { errorHandler } from './middleware/errorHandler'
import { corsOptions } from './cors'

const app = express()

app.use(cors(corsOptions))
app.use(express.json())
app.use('/', router)
app.use(errorHandler)

export default app
