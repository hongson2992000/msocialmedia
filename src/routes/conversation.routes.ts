import { Router } from 'express'
import { getConversationsController } from '~/controllers/conversations.controllers'
import { getConversationValidator } from '~/middlewares/conversation.middlewares'
import { paginationValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const conversationRouter = Router()

/**
 * Route for get conversation.
 * @name GET /
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} verifiedUserValidator - Middleware function for verify user validation.
 * @param {Function} getConversationController - Controller function for get conversation.
 */
conversationRouter.get(
  '/receivers/:receiver_id',
  accessTokenValidator,
  verifiedUserValidator,
  getConversationValidator,
  paginationValidator,
  wrapRequestHandler(getConversationsController)
)

export default conversationRouter
