import { ObjectId } from 'mongodb'
import databaseService from './database.services'
import { MediaType, MediaTypeQuery, TweetType } from '~/constants/enums'

class SearchService {
  async search({
    content,
    user_id,
    media_type,
    people_follow,
    limit,
    page
  }: {
    content: string
    user_id: string
    media_type?: MediaTypeQuery
    people_follow?: string
    limit: number
    page: number
  }) {
    const user_id_object = new ObjectId(user_id)
    const $match: any = { $text: { $search: content } }
    if (media_type) {
      if (media_type === MediaTypeQuery.Image) {
        $match['medias.type'] = MediaType.Image
      } else if (media_type === MediaTypeQuery.Video) {
        $match['medias.type'] = {
          $in: [MediaType.Video, MediaType.HLS]
        }
      }
    }
    if (people_follow && people_follow === '1') {
      const followed_user_id = await databaseService.followers
        .find({ user_id: user_id_object }, { projection: { followed_user_id: 1 } })
        .toArray()
      const ids = followed_user_id.map((item) => item.followed_user_id)

      // Lấy luôn cả tweet của chính mình
      ids.push(user_id_object)
      $match['user_id'] = {
        $in: ids
      }
    }
    const [tweets, total] = await Promise.all([
      databaseService.tweets
        .aggregate([
          { $match },
          {
            $lookup: {
              from: 'users',
              localField: 'user_id',
              foreignField: '_id',
              as: 'user'
            }
          },
          { $unwind: { path: '$user' } },
          {
            $match: {
              $or: [
                { audience: 0 },
                {
                  $and: [
                    { audience: 1 },
                    {
                      'user.twitter_circle': {
                        $in: [new ObjectId(user_id)]
                      }
                    }
                  ]
                }
              ]
            }
          },
          {
            $lookup: {
              from: 'hashtags',
              localField: 'hashtags',
              foreignField: '_id',
              as: 'hashtags'
            }
          },
          {
            $lookup: {
              from: 'users',
              localField: 'mentions',
              foreignField: '_id',
              as: 'mentions'
            }
          },
          {
            $addFields: {
              mentions: {
                $map: {
                  input: '$mentions',
                  as: 'mention',
                  in: {
                    _id: 'mention._id',
                    name: 'mention.name',
                    email: 'mention.email'
                  }
                }
              }
            }
          },
          {
            $lookup: {
              from: 'bookmarks',
              localField: '_id',
              foreignField: 'tweet_id',
              as: 'bookmarks'
            }
          },
          {
            $lookup: {
              from: 'likes',
              localField: '_id',
              foreignField: 'tweet_id',
              as: 'likes'
            }
          },
          {
            $lookup: {
              from: 'tweets',
              localField: '_id',
              foreignField: 'parent_id',
              as: 'tweet_children'
            }
          },
          {
            $addFields: {
              bookmark_count: { $size: '$bookmarks' },
              like_count: { $size: '$likes' },
              retweet_count: {
                $size: {
                  $filter: {
                    input: '$tweet_children',
                    as: 'item',
                    cond: { $eq: ['$$item.type', TweetType.Retweet] }
                  }
                }
              },
              comment_count: {
                $size: {
                  $filter: {
                    input: '$tweet_children',
                    as: 'item',
                    cond: { $eq: ['$$item.type', TweetType.Comment] }
                  }
                }
              },
              quote_count: {
                $size: {
                  $filter: {
                    input: '$tweet_children',
                    as: 'item',
                    cond: { $eq: ['$$item.type', TweetType.QuoteTweet] }
                  }
                }
              }
            }
          },
          {
            $project: {
              tweet_children: 0,
              user: {
                password: 0,
                email_verify_token: 0,
                forgot_password_token: 0,
                twitter_circle: 0,
                date_of_birth: 0
              }
            }
          },
          {
            $skip: limit * (page - 1)
          },
          { $limit: limit }
        ])
        .toArray(),
      databaseService.tweets
        .aggregate([
          { $match },
          {
            $lookup: {
              from: 'users',
              localField: 'user_id',
              foreignField: '_id',
              as: 'user'
            }
          },
          { $unwind: { path: '$user' } },
          {
            $match: {
              $or: [
                { audience: 0 },
                {
                  $and: [
                    { audience: 1 },
                    {
                      'user.twitter_circle': {
                        $in: [user_id]
                      }
                    }
                  ]
                }
              ]
            }
          },
          { $count: 'total' }
        ])
        .toArray()
    ])

    //Tăng view cho tweet children
    const tweet_ids = tweets.map((tweet) => tweet._id as ObjectId)
    const date = new Date()
    await databaseService.tweets.updateMany(
      { _id: { $in: tweet_ids } },
      { $inc: { user_views: 1 }, $set: { updated_at: date } }
    ),
      tweets.forEach((tweet) => {
        tweet.updated_at = date
        tweet.user_views += 1
      })
    return {
      tweets,
      total: total[0]?.total || 0
    }
  }
}

const searchService = new SearchService()
export default searchService
