import { apiRouter } from './mail/infraestructure/routes/apiRouter'
import { Server } from './shared/mail/server'

const server = Server.getInstance()
;(async () => {
  const routes = apiRouter()
  await server.run(routes)
})()
