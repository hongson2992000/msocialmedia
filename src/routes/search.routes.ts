import { Router } from 'express'
import { bookmarkTweetController, unbookmarkTweetController } from '~/controllers/bookmarks.controllers'
import { searchController } from '~/controllers/searchs.controllers'
import { searchValidator } from '~/middlewares/search.middleares'
import { paginationValidator, tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const searchRouter = Router()

/**
 * Route for bookmark tweet.
 * @name GET /
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} verifiedUserValidator - Middleware function for verify user validation.
 * @param {Function} searchController - Controller function for bookmark tweet.
 * @body {tweet_id} req.body - The request body.
 */
searchRouter.get(
  '/',
  searchValidator,
  accessTokenValidator,
  verifiedUserValidator,
  paginationValidator,
  wrapRequestHandler(searchController)
)

export default searchRouter
