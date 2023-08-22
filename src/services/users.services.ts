import { loginReqBody, registerReqBody } from '~/models/requests/User.requests'
import database from './database.services'
import User from '~/models/schemas/User.schemas'
import { hashPassword } from '~/utils/crypto'
import { signToken } from '~/utils/jwt'
import { TokenType } from '~/constants/enums'
import 'dotenv/config'
import Refresh_token from '~/models/schemas/Refresh_token.schemas'

// Create access token
const signAccessToken = async (user_id: string) => {
  return await signToken({
    payload: {
      user_id,
      token_type: TokenType.AccessToken
    },
    options: {
      expiresIn: process.env.JWT_AT_EXP
    }
  })
}

// Create refresh token
const signRefreshToken = async (user_id: string) => {
  return await signToken({
    payload: {
      user_id,
      token_type: TokenType.RefreshToken
    },
    options: {
      expiresIn: process.env.JWT_RT_EXP
    }
  })
}

// Create tokens
const createTokens = async (user_id: string) => {
  const [access_token, refresh_token] = await Promise.all([signAccessToken(user_id), signRefreshToken(user_id)])
  return {
    access_token,
    refresh_token
  }
}

// Register
export const registerService = async (reqBody: registerReqBody) => {
  // Insert user to database
  const result = await database.users().insertOne(
    new User({
      ...reqBody,
      date_of_birth: new Date(reqBody.date_of_birth),
      password: hashPassword(reqBody.password)
    })
  )

  return result
}

// Login
export const loginService = async (reqBody: loginReqBody) => {
  // Check if user exists
  const user = await database.users().findOne({ ...reqBody, password: hashPassword(reqBody.password) })

  if (user) {
    const userId = user._id.toString()

    // Create tokens
    const token = await createTokens(userId)
    const refresh_token = new Refresh_token({ user_id: userId, token: token.refresh_token })

    // Save refresh token to database
    await database.refresh_tokens().insertOne(refresh_token)

    // Return tokens to client
    return token

    // null if user does not exist
  } else return user
}
