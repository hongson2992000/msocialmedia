import { checkSchema } from 'express-validator'
import { validate } from '~/utils/validation'
import { userIdSchema } from './users.middlewares'

export const getConversationValidator = validate(
  checkSchema(
    {
      receiver_id: userIdSchema
    },
    ['params']
  )
)
