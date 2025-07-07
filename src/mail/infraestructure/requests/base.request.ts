import { NextFunction, Request, Response } from 'express'
import { z, ZodError } from 'zod'

import autoBind from 'auto-bind'

export class BaseRequest {
  constructor () {
    autoBind(this)
  }

  validate (schema: z.ZodObject<any, any>) {
    return (request: Request, response: Response, next: NextFunction) => {
      try {
        if (!request.body) {
          response.status(400).json({ message: 'Invalid body request' })
          return
        }
        schema.parse(request.body)
        next()
      } catch (error) {
        if (error instanceof ZodError) {
          const errorMessages = error.errors.map(issue => {
            return {
              message: `${issue.path.join('.')} is ${issue.message}`
            }
          })
          response
            .status(400)
            .json({ error: 'Invalid data', details: errorMessages })
        } else {
          response.status(500).json({ error: 'Internal Server Error' })
        }
      }
    }
  }
}
