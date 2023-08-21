import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import HTTP_STATUS from '~/constants/httpStatus'
import { loginReqBody, registerReqBody } from '~/models/requests/User.requests'
import { loginService, registerService } from '~/services/users.services'

export const registerController = async (req: Request<ParamsDictionary, any, registerReqBody>, res: Response) => {
  const result = await registerService(req.body)
  if (result) {
    res.status(HTTP_STATUS.CREATED).json({
      message: 'Register success',
      result
    })
  } else {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Register fail'
    })
  }
}

export const loginController = async (req: Request<ParamsDictionary, any, loginReqBody>, res: Response) => {
  const result = await loginService(req.body)
  if (result) {
    res.status(HTTP_STATUS.OK).json({
      message: 'Login success',
      result
    })
  } else {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: 'Login fail',
      result
    })
  }
}
