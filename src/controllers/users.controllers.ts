import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HTTP_STATUS from '~/constants/httpStatus'
import { registerReqBody } from '~/models/requests/User.requests'
import { registerService } from '~/services/users.services'

export const registerController = async (req: Request<ParamsDictionary, any, registerReqBody>, res: Response) => {
  const result = await registerService(req.body)
  res.status(HTTP_STATUS.CREATED).json({
    message: 'Register success',
    result
  })
}
