import { registerReqBody } from '~/models/requests/User.requests'
import database from './database.services'
import User from '~/models/schemas/User.schemas'
import { createHash } from 'crypto'

export const registerService = async (reqBody: registerReqBody) => {
  try {
    const result = await database.users().insertOne(
      new User({
        ...reqBody,
        date_of_birth: new Date(reqBody.date_of_birth),
        password: createHash('sha256').update(reqBody.password).digest('hex')
      })
    )
    return result
  } catch (error: any) {
    throw new Error(error)
  }
}
