import { sign, Secret, SignOptions } from 'jsonwebtoken'
import 'dotenv/config'

export const signToken = ({
  payload,
  privateKey = process.env.JWT_PRIVATE_KEY as string,
  options = { algorithm: 'HS256' }
}: {
  payload: string | object | Buffer
  privateKey?: Secret
  options?: SignOptions
}) => {
  return new Promise<string>((resolve, reject) => {
    sign(payload, privateKey, options, (err, token) => {
      if (err) {
        reject(err)
      } else {
        resolve(token as string)
      }
    })
  })
}
