/**
 * Represents the user routes for the Twitter clone API.
 * @module routes/users.routers
 */

import { Router } from 'express'
import {
  verifyEmailController,
  loginController,
  logoutController,
  registerController,
  resendverifyEmailController,
  forgotPasswordController,
  verifyForgotPasswordTokenController,
  resetPasswordController,
  getMeController,
  updateMeController,
  getProfileController,
  followController,
  unfollowController,
  changePasswordController,
  oauthController,
  refreshTokenController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
  followValidator,
  forgotPasswordValidator,
  loginValidate,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  unfollowValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { UpdateMeReqBody } from '~/models/requests/User.requests'
import { wrapRequestHandler } from '~/utils/handlers'

/**
 * Express router for handling user routes.
 */
const userRouter = Router()

/**
 * Route for user login.
 * @name POST /login
 * @function
 * @param {Function} loginValidate - Middleware function for login validation.
 * @param {Function} loginController - Controller function for user login.
 * @body {Object} req.body - The request body.
 * @body {string} req.body.email - The user's email.
 * @body {string} req.body.password - The user's password.
 */
userRouter.post('/login', loginValidate, wrapRequestHandler(loginController))

/**
 * Route for user login.
 * @name GET /oauth/google
 * @function
 * @param {Function} loginValidate - Middleware function for login validation.
 * @param {Function} loginController - Controller function for user login.
 * @body {Object} req.body - The request body.
 * @body {string} req.body.email - The user's email.
 * @body {string} req.body.password - The user's password.
 */
userRouter.get('/oauth/google', wrapRequestHandler(oauthController))
/**
 * Route for user registration.
 * @name POST /register
 * @function
 * @param {Function} registerController - Controller function for user registration.
 * @body {Object} req.body - The request body.
 * @body {string} req.body.name - The user's name.
 * @body {string} req.body.email - The user's email.
 * @body {string} req.body.password - The user's password.
 * @body {string} req.body.confirm_password - The user's password confirmation.
 * @body {string} req.body.date_of_birth - The user's date of birth in ISO8601 format.
 */
userRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Route for user logout.
 * @name POST /logout
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} refreshTokenValidator - Middleware function for refresh token validation.
 * @param {Function} logoutController - Controller function for user logout.
 * @body {Object} req.body - The request body.
 * @body {string} req.body.refresh_token - The user's refresh token.
 */
userRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Route for user refresh token.
 * @name POST /refresh-token
 * @function
 * @param {Function} refreshTokenValidator - Middleware function for refresh token validation.
 * @param {Function} refreshTokenController - Controller function for user logout.
 * @body {Object} req.body - The request body.
 * @body {string} req.body.refresh_token - The user's refresh token.
 */
userRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

/**
 * Route for verify email.
 * @name POST /verify-email
 * @function
 * @param {Function} emailVerifyTokenValidator - Middleware function for email verification token validation.
 * @param {Function} verifyEmailController - Controller function for email verification.
 * @body {Object} req.body - The request body.
 * @body {string} req.body.email_verify_token - The email verification token.
 */
userRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

/**
 * Route for resending email verification.
 * @name POST /resend-verify-email
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} resendverifyEmailController - Controller function for resending email verification.
 */
userRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendverifyEmailController))

/**
 * Route for forgot-password.
 * @name POST /forgot-password
 * @function
 * @param {Function} forgotPasswordValidator - Middleware function for access token validation.
 * @param {Function} resendverifyEmailController - Controller function for resending email verification.
 */
userRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * Route for Verify link in email to reset password.
 * @name POST /verify-forgot-password
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} resendverifyEmailController - Controller function for resending email verification.
 */
userRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordTokenController)
)

/**
 * Route for Verify link in email to reset password.
 * @name POST /reset-password
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} resetPasswordController - Controller function for resending email verification.
 */
userRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

/**
 * Route for change password.
 * @name POST /change-password
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} resendverifyEmailController - Controller function for resending email verification.
 */
userRouter.post(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)

/**
 * Route for Get my profile.
 * @name GET /me
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} getMeController - Controller function for resending email verification.
 */
userRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

/**
 * Route for Update my profile.
 * @name PATCH /me
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} updateMeController - Controller function for resending email verification.
 */
userRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
  filterMiddleware<UpdateMeReqBody>([
    'username',
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'avatar',
    'cover_photo'
  ]),
  wrapRequestHandler(updateMeController)
)

/**
 * Route for Get user profile.
 * @name GET /:username
 * @function
 * @param {Function} getMeController - Controller function for resending email verification.
 */
userRouter.get('/:username', wrapRequestHandler(getProfileController))

/**
 * Route for follow someone.
 * @name POST /follow
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} resendverifyEmailController - Controller function for resending email verification.
 * @body {user_id} req.body - The request body.
 */
userRouter.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator,
  followValidator,
  wrapRequestHandler(followController)
)

/**
 * Route for unfollow someone.
 * @name DELETE /follow/user_id
 * @function
 * @param {Function} accessTokenValidator - Middleware function for access token validation.
 * @param {Function} resendverifyEmailController - Controller function for resending email verification.
 * @body {user_id} req.body - The request body.
 */
userRouter.delete(
  '/follow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowValidator,
  wrapRequestHandler(unfollowController)
)
export default userRouter
