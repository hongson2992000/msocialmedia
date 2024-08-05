import { Router } from 'express'
import { serveVideoStreamController, severImageController } from '~/controllers/medias.controllers'

const staticRouter = Router()

staticRouter.get('/image/:name', severImageController)
staticRouter.get('/video-stream/:name', serveVideoStreamController)

export default staticRouter
