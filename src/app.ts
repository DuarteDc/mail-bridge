import { apiRouter } from './mail/infraestructure/routes/apiRouter'
import { Server } from './mail/presentation/server'

const server = Server.getInstance()
;(async () => {
  const routes = apiRouter()
  await server.run(routes)
})()
