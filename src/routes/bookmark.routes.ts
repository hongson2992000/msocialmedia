import { Router } from 'express'
import { bookmarkTweetController, unbookmarkTweetController } from '~/controllers/bookmarks.controllers'
import { tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const bookmarkRouter = Router()

/**
 * Route for bookmark tweet.
 * @name POST /
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} verifiedUserValidator - Middleware function for verify user validation.
 * @param {Function} bookmarkTweetController - Controller function for bookmark tweet.
 * @body {tweet_id} req.body - The request body.
 */
bookmarkRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(bookmarkTweetController)
)

/**
 * Route for unbookmark tweet.
 * @name DELETE /
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} verifiedUserValidator - Middleware function for verify user validation.
 * @param {Function} bookmarkTweetController - Controller function for bookmark tweet.
 */
bookmarkRouter.delete(
  '/:tweet_id',
  accessTokenValidator,
  verifiedUserValidator,
  tweetIdValidator,
  wrapRequestHandler(unbookmarkTweetController)
)

export default bookmarkRouter
