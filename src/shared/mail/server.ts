import Express, { Router } from 'express'
import cors from 'cors'

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
    Server.server.use(cors())
    Server.server.use(Express.json())
    Server.server.use(apiRouter)
    Server.server.listen(3000, () => {
      console.log('Server is running')
    })
  }
}
