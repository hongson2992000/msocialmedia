import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core' // Import ParamsDictionary type
import { LikeTweetRequestBody, UnlikeTweetReqParams } from '~/models/requests/Like.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import likeService from '~/services/likes.services'

export const likeTweetController = async (req: Request<ParamsDictionary, any, LikeTweetRequestBody>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await likeService.likeTweet(user_id, req.body.tweet_id)
  return res.json({
    message: 'Like Tweet successfully',
    data: result
  })
}

export const unlikeTweetController = async (req: Request<UnlikeTweetReqParams>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await likeService.unlikeTweet(user_id, req.params.tweet_id)
  return res.json({
    message: 'Unlike Tweet successfully',
    data: result
  })
}
