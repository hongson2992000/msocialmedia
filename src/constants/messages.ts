export const USERS_MESSAGES = {
  VALIDATION_ERROR: 'Validation error',

  NAME_IS_REQUIRED: 'Name is required.',
  NAME_MUST_BE_A_STRING: 'Name must be a string.',
  NAME_LENGTH_MUST_BE_FROM_1_TO_100: 'Name must be between 1 and 100 characters long.',

  EMAIL_IS_REQUIRED: 'Email is required.',
  EMAIL_IS_INVALID: 'Email is invalid.',
  EMAIL_ALREADY_EXISTED: 'Email already exists.',
  EMAIL_NOT_VERIFIED: 'Email is not verified.',

  PASSWORD_IS_REQUIRED: 'Password is required.',
  PASSWORD_IS_A_STRING: 'Password must be a string.',
  PASSWORD_MUST_BE_STRONG:
    'Password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.',
  PASSWORD_MUST_BE_FROM_6_TO_50: 'Password must be between 6 and 50 characters long.',
  OLD_PASSWORD_NOT_MATCH: 'Old password does not match the current password.',
  CHANE_PASSWORD_SUCCESS: 'Change password successful.',

  CONFIRM_PASSWORD_IS_REQUIRED: 'Confirm password is required.',
  CONFIRM_PASSWORD_IS_A_STRING: 'Confirm password must be a string.',
  CONFIRM_PASSWORD_MUST_BE_FROM_6_TO_50: 'Confirm password must be between 6 and 50 characters long.',
  CONFIRM_PASSWORD_MUST_BE_STRONG:
    'Confirm password must be at least 6 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character.',
  CONFIRM_PASSWORD_DOES_NOT_MATCH: 'Confirmation password does not match the password.',

  DATE_OF_BIRTH_IS_INVALID: 'Date of birth is ISO8601.',
  DATE_OF_BIRTH_IS_REQUIRED: 'Date of birth is required.',

  BIO_MUST_BE_A_STRING: 'Bio must be a string.',
  BIO_LENGTH: 'Bio must be between 1 and 200 characters long.',

  LOCATION_MUST_BE_A_STRING: 'Location must be a string.',
  LOCATION_LENGTH: 'Location must be between 1 and 200 characters long.',

  WEBSITE_MUST_BE_A_STRING: 'Website must be a string.',
  WEBSITE_LENGTH: 'Website must be between 1 and 200 characters long.',

  USERNAME_MUST_BE_A_STRING: 'Username must be a string.',
  USERNAME_INVALID: 'Username must be between 4-15 characters long and contain only letters, numbers, and underscores.',
  USERNAME_ALREADY_EXISTED: 'Username already exists.',

  IMAGE_URL_MUST_BE_A_STRING: 'Image URL must be a string',
  IMAGE_URL_LENGTH: 'Image URL must be between 1 and 400 characters long.',
  IMAGE_NOT_FOUND: 'Image not found.',
  UPLOAD_SINGLE_IMAGE_SUCCESS: 'Upload single image successful.',

  COVER_PHOTO_MUST_BE_A_STRING: 'Cover photo must be a string.',
  COVER_PHOTO_LENGTH: 'Cover photo must be between 1 and 400 characters long.',

  EMAIL_VERIFY_TOKEN_IS_REQUIRED: 'Email verification token is required.',
  EMAIL_ALREADY_VERIFIED: 'Email is already verified.',
  EMAIL_VERIFY_SUCCESS: 'Email verification successful.',
  RESEND_VERIFY_EMAIL_SUCCESS: 'Resend email verification successful.',
  CHECKED_EMAIL_TO_RESET_PASSWORD: 'We have sent an email to reset your password.',
  VERIFY_FORGOT_PASSWORD_TOKEN_SUCCESS: 'Verify forgot password token successful.',
  RESET_PASSWORD_SUCCESS: 'Reset password successful.',

  FOLLOWED_USER_ID_NOT_FOUND: 'Followed user id not found.',
  ALREADY_UNFOLLOWED: 'Already unfollowed.',
  USER_NOT_FOUND: 'Email or password is incorrect.',
  USER_NOT_VERIFIED: 'User not verified',

  UPDATE_ME_SUCCESS: 'Update profile successful.',

  LOGIN_SUCCESS: 'Login successful.',
  REGISTER_SUCCESS: 'Registration successful.',
  LOGOUT_SUCCESS: 'Logout successful.',
  VERIFY_SUCCESS: 'Verify successful.',
  REFRESH_TOKEN_SUCCESS: 'Refresh token successful.',

  ACCESS_TOKEN_REQUIRED: 'Access token is required.',
  REFRESH_TOKEN_REQUIRED: 'Refresh token is required.',
  REFRESH_TOKEN_IS_INVALID: 'Refresh token is invalid.',
  REFRESH_TOKEN_USED_OR_NOT_EXSITED: 'Refresh token is used or not existed.',
  FORGOT_PASSWORD_TOKEN_IS_REQUIRED: 'Forgot password token is required.',
  INVALID_FORGOT_PASSWORD_TOKEN: 'Invalid forgot password token.',

  GET_ME_SUCCESS: 'Get my profile successful.',
  GET_PROFILE_SUCCESS: 'Get profile successful.',

  INVALID_USER_ID: 'Invalid user id.',
  FOLLOW_SUCCESS: 'Follow successful.',
  UNFOLLOW_SUCCESSFUL: 'Unfollow successful.'
} as const

export const TWEETS_MESSAGE = {
  INVALID_TYPE: 'Invalid type',
  INVALID_AUDIENCE: 'Invalid audience',
  PARENT_ID_MUST_BE_A_VALID_TWEET_ID: 'Parent id must be a valid tweet id',
  PARENT_ID_MUST_BE_NULL: 'Parent id must be null',
  CONTENT_MUST_BE_A_NON_EMPTY_STRING: 'Content must be a non-empty string',
  CONTENT_MUST_BE_EMPTY_STRING: 'Content must be empty string',
  HASHTAGS_MUST_BE_AN_ARRAY_OF_STRING: 'Hashtags must be an array of string',
  MENTIONS_MUST_BE_AN_ARRAY_OF_USER_ID: 'Mentions must be an array of user id',
  MEDIAS_MUST_BE_AN_ARRAY_OF_MEDIA_OBJECT: 'Medias must be an array of media object',
  INVALID_TWEET_ID: 'Invalid tweet id',
  TWEET_NOT_FOUND: 'Tweet not found',
  TWEET_IS_NOT_PUBLIC: 'Tweet is not public'
} as const

export const BOOKMARK_MESSAGES = {
  BOOKMARK_SUCCESSFULLY: 'Bookmark successfully',
  UNBOOKMARK_SUCCESSFULLY: 'Unbookmark successfully'
}

export const LIKE_MESSAGES = {
  LIKE_SUCCESSFULLY: 'Like successfully',
  UNLIKE_SUCCESSFULLY: 'Unlike successfully'
}
