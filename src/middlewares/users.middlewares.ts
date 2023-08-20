import { checkSchema } from 'express-validator'
import database from '~/services/database.services'
import validate from '~/utils/validate'

export const registerValidator = validate(
  checkSchema(
    {
      username: {
        trim: true,
        isLength: {
          options: {
            min: 1,
            max: 100
          },
          errorMessage: 'Username must be between 1 and 100 characters'
        }
      },
      email: {
        isEmail: {
          errorMessage: 'Email must be a valid email address'
        },
        custom: {
          options: async (value, { req }) => {
            if (await database.users().findOne({ email: value })) {
              throw new Error('Email already exists')
            }
            return true
          }
        }
      },
      password: {
        isStrongPassword: {
          errorMessage:
            'Password must be at least 8 characters, contain at least 1 lowercase letter, 1 uppercase letter, 1 number, and 1 symbol'
        }
      },
      confirmPassword: {
        custom: {
          options: (value, { req }) => {
            if (value !== req.body.password) {
              throw new Error('Confirm password does not match password')
            }
            return true
          }
        }
      },
      date_of_birth: {
        isISO8601: {
          options: {
            strict: true,
            strictSeparator: true
          },
          errorMessage: 'Day of birth must be a valid ISO8601 date'
        }
      }
    },
    ['body']
  )
)
