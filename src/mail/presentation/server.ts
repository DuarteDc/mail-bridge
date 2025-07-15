import Express, { Router, Response, Request } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import rateLimit from 'express-rate-limit'

import { envs } from '@env/env.plugin'

export class Server {
  private static server: Express.Express
  static #instance: Server
  private readonly router = Router()

  private constructor () {}

  public static getInstance (): Server {
    if (!Server.#instance) {
      Server.#instance = new Server()
      Server.server = Express()
    }

    return Server.#instance
  }

  async run (apiRouter: Router) {
    this.loadMiddlewares()
    Server.server.use(this.healt())
    Server.server.use(apiRouter)
    this.notFound()
    Server.server.listen(envs.PORT, () => {
      console.log(`🚀 Server is running on port ${envs.PORT}`)
    })
  }

  private loadMiddlewares () {
    Server.server.use(cors())
    Server.server.use(helmet())
    Server.server.use(this.limitRequestPerUser())
    Server.server.use(Express.json())
    Server.server.use(Express.urlencoded({ extended: true }))
    Server.server.use(bodyParser.urlencoded({ extended: false }))
  }

  private limitRequestPerUser (minutes = 10, limit = 100) {
    return rateLimit({
      windowMs: minutes * 60 * 100,
      limit,
      standardHeaders: 'draft-8',
      legacyHeaders: false
    })
  }

  private healt () {
    this.router.get(
      '/ping',
      this.limitRequestPerUser(5, 100),
      (__, response: Response) => {
        response.status(200).send('pong')
      }
    )
    return this.router
  }

  private notFound () {
    Server.server.use((request: Request, response: Response) => {
      response
        .status(404)
        .send(
          `The requested URL ${request.originalUrl} was not found on this server.`
        )
    })
  }
}
