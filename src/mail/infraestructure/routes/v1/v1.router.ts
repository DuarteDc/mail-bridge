import { Router } from 'express'
import mailRouter from './mail/mail.router'

const v1Router = Router()

v1Router.use('/mail', mailRouter)

export default v1Router
