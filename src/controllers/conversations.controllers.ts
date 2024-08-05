import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ConversationParams } from '~/models/requests/Conversation.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import conversationService from '~/services/conversation.services'

export const getConversationsController = async (
  req: Request<ParamsDictionary, any, any, ConversationParams>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)
  const { receiver_id } = req.params
  const result = await conversationService.getConversation({ sender_id: user_id, receiver_id, limit, page })
  return res.json({
    message: 'Get conversations successfully',
    data: result.data,
    limit,
    page,
    total_page: Math.ceil(result.total / limit)
  })
}
