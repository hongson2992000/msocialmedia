import { Router } from 'express'
import { likeTweetController, unlikeTweetController } from '~/controllers/likes.controllers'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const likeRouter = Router()

/**
 * Route for like tweet.
 * @name POST /
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} verifiedUserValidator - Middleware function for verify user validation.
 * @param {Function} bookmarkTweetController - Controller function for bookmark tweet.
 * @body {tweet_id} req.body - The request body.
 */
likeRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(likeTweetController)
)

/**
 * Route for unbookmark tweet.
 * @name DELETE /
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} verifiedUserValidator - Middleware function for verify user validation.
 * @param {Function} bookmarkTweetController - Controller function for bookmark tweet.
 */
likeRouter.delete(
  '/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(unlikeTweetController)
)

export default likeRouter
