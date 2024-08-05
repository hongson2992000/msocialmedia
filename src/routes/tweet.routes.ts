import { Router } from 'express'
import {
  createTweetController,
  getNewFeedsController,
  getTweetChildrenController,
  getTweetController
} from '~/controllers/tweets.controllers'
import {
  audienceValidator,
  createTweetValidate,
  getTweetChildrenValidator,
  paginationValidator,
  tweetIdValidator
} from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, isUserLoggedInValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const tweetRouter = Router()

/**
 * Route for create tweet.
 * @name POST /
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} verifiedUserValidator - Middleware function for verify user validation.
 * @param {Function} createTweetValidate - Middleware function for create tweet validation.
 * @param {Function} createTweetController - Controller function for create tweet.
 * @body TweetRequestBody - The request body.
 */
tweetRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidate,
  wrapRequestHandler(createTweetController)
)

/**
 * Route for get tweet.
 * @name GET /
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} verifiedUserValidator - Middleware function for verify user validation.
 * @param {Function} getTweetController - Controller function for get tweet.
 * @body TweetRequestBody - The request body.
 */
tweetRouter.get(
  '/:tweet_id',
  tweetIdValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetController)
)

/**
 * Route for get tweet.
 * @name GET /
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} verifiedUserValidator - Middleware function for verify user validation.
 * @param {Function} createTweetController - Controller function for create tweet.
 * @body TweetRequestBody - The request body.
 * @query {limit: number, page: number, tweet_type: TweetType}
 */
tweetRouter.get(
  '/children/:tweet_id',
  tweetIdValidator,
  getTweetChildrenValidator,
  isUserLoggedInValidator(accessTokenValidator),
  isUserLoggedInValidator(verifiedUserValidator),
  audienceValidator,
  wrapRequestHandler(getTweetChildrenController)
)

/**
 * Route for get tweet.
 * @name GET /new-feeds
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} verifiedUserValidator - Middleware function for verify user validation.
 * @param {Function} createTweetController - Controller function for create tweet.
 * @body TweetRequestBody - The request body.
 * @query {limit: number, page: number, tweet_type: TweetType}
 */
tweetRouter.get(
  '/',
  paginationValidator,
  accessTokenValidator,
  verifiedUserValidator,
  wrapRequestHandler(getNewFeedsController)
)

export default tweetRouter
