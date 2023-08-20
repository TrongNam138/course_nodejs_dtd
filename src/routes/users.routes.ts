import { Router } from 'express'
import { registerController } from '~/controllers/users.controllers'
import { registerValidator } from '~/middlewares/users.middlewares'

const usersRouter = Router()

usersRouter.post('/register', registerValidator, registerController)

export default usersRouter