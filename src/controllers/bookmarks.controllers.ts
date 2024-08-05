import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core' // Import ParamsDictionary type
import { BookmarkRequestBody, UnbookmarkReqParams } from '~/models/requests/Bookmark.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import bookmarkService from '~/services/bookmarks.services'

export const bookmarkTweetController = async (
  req: Request<ParamsDictionary, any, BookmarkRequestBody>,
  res: Response
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await bookmarkService.bookmarkTweet(user_id, req.body.tweet_id)
  return res.json({
    message: 'Bookmark Tweet successfully',
    data: result
  })
}

export const unbookmarkTweetController = async (req: Request<UnbookmarkReqParams>, res: Response) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await bookmarkService.unbookmarkTweet(user_id, req.params.tweet_id)
  return res.json({
    message: 'Unbookmark Tweet successfully',
    data: result
  })
}
