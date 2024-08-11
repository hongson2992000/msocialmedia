import express from 'express'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middlewares'
import { initFolder } from './utils/file'
import { UPLOAD_IMAGE_DIR } from './constants/dir'
import mediaRouter from './routes/media.routes'
import userRouter from './routes/users.routes'
import staticRouter from './routes/static.routes'
import { envConfig, isProduction } from './constants/config'
import tweetRouter from './routes/tweet.routes'
import bookmarkRouter from './routes/bookmark.routes'
import likeRouter from './routes/like.routes'
import searchRouter from './routes/search.routes'
import '~/utils/s3'
import { createServer } from 'http'
import conversationRouter from './routes/conversation.routes'
import initSocket from './utils/socket'
import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import cors, { CorsOptions } from 'cors'
import helmet from 'helmet'
import { rateLimit } from 'express-rate-limit'
// import '~/utils/fake'

//Create server
const app = express()
const httpServer = createServer(app)
const port = envConfig.port || 3000

//Helmet
app.use(helmet())

//CORS
const corsOptions: CorsOptions = {
  origin: isProduction ? envConfig.clientUrl : '*'
}
app.use(cors(corsOptions))

// Rate limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
})
app.use(limiter)

//Swagger
const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'M Social API Documentation',
      version: '1.0.0'
    }
  },
  apis: ['./openapi/*.yaml'] // files containing annotations as above
}
const openapiSpecification = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

//Index MongoDB
databaseService.connectDB().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  // databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})

// Create folder upload
initFolder()

app.use(express.json())

//Import routes
app.use('/users', userRouter)
app.use('/medias', mediaRouter)
app.use('/static', staticRouter)
app.use('/static/video', express.static(UPLOAD_IMAGE_DIR))
app.use('/tweets', tweetRouter)
app.use('/bookmarks', bookmarkRouter)
app.use('/likes', likeRouter)
app.use('/searchs', searchRouter)
app.use('/conversations', conversationRouter)

//Error handler
app.use(defaultErrorHandler)

//Websocket
initSocket(httpServer)

httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
