import { PaginationQuery } from './Tweet.requests'
import { Query } from 'express-serve-static-core'

export interface ConversationParams extends Query, PaginationQuery {
  receiver_id: string
}
