import { Request, Response, Router } from 'express'

const mailRouter = Router()

mailRouter.post('/send', (__: Request, response: Response) => {
  response.send('Hello from mail bridge')
})

export default mailRouter
