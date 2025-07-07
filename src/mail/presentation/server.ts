import Express, { Router, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'

import { envs } from '@env/env.plugin'
import bodyParser from 'body-parser'

export class Server {
  private static server: Express.Express
  static #instance: Server

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
    const route = Router()
    route.get(
      '/ping',
      this.limitRequestPerUser(5, 10),
      (__, response: Response) => {
        response.status(200).send('pong')
      }
    )
    return route
  }
}
