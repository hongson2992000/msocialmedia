import { ObjectId } from 'mongodb'
import databaseService from './database.services'

class ConversationService {
  async getConversation({
    sender_id,
    receiver_id,
    limit,
    page
  }: {
    sender_id: string
    receiver_id: string
    limit: number
    page: number
  }) {
    const match = {
      $or: [
        {
          sender_id: new ObjectId(sender_id),
          receiver_id: new ObjectId(receiver_id)
        },
        {
          sender_id: new ObjectId(receiver_id),
          receiver_id: new ObjectId(sender_id)
        }
      ]
    }
    const [data, total] = await Promise.all([
      databaseService.conversations
        .find(match)
        .sort({ created_at: -1 })
        .skip(limit * (page - 1))
        .limit(limit)
        .toArray(),
      databaseService.conversations.countDocuments(match)
    ])
    return { data, total }
  }
}
const conversationService = new ConversationService()
export default conversationService
