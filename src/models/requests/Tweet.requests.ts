import { TweetAudience, TweetType } from '~/constants/enums'
import { Media } from '../Other'
import { ParamsDictionary, Query } from 'express-serve-static-core'

export interface TweetRequestBody {
  type: TweetType
  audience: TweetAudience
  content: string
  parent_id: null | string //  chỉ null khi tweet gốc, không thì là tweet_id cha dạng string
  hashtags: string[] // tên của hashtag dạng ['javascript', 'reactjs']
  mentions: string[] // user_id[]
  medias: Media[]
}
export interface TweetParams extends ParamsDictionary {
  tweet_id: string
}

export interface TweetQuery extends Query, PaginationQuery {
  tweet_type: string
}

export interface PaginationQuery extends Query {
  limit: string
  page: string
}
